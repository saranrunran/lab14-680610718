import type { Registrant } from "../libs/Registrant";

const planNames: Record<string, string> = {
  funrun: "Fun run 5.5 Km",
  mini: "Mini Marathon 10 Km",
  half: "Half Marathon 21 Km",
  full: "Full Marathon 42.195 Km",
};

const extraNames: Record<string, string> = {
  bottle: "Bottle 🍼",
  shoes: "Shoes 👟",
  cap: "Cap 🧢",
};

export default function UserRegisterCard({
  id: _id,
  fullName,
  gender, 
  plan,
  extra,
  total
}: Registrant) {
  const genderText = gender === "male" ? "👨 Male" : "👩 Female";

  return (
    <div className="card p-3 my-3 shadow-sm d-flex flex-row justify-content-between align-items-start">
      <div>
        <p className="fw-bold fs-5 mb-1">{fullName}</p>
        <p className="text-muted small mb-2">{planNames[plan] || plan} · {genderText}</p>
        <div className="d-flex flex-wrap gap-1">
          {extra &&
            extra.map((itemId) => (
              <span key={itemId} className="badge bg-light text-dark border fw-normal">
                {extraNames[itemId] || itemId}
              </span>
            ))}
        </div>
      </div>
      <div className="fw-bold">
        {total.toLocaleString()} THB
      </div>
    </div>
  );
}