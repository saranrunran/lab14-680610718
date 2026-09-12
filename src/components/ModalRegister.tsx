import { useState } from "react";

type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
  extra: string[],
};
//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister({ onClose }: { onClose: () => void }) {

  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
    extra: [],
  });

  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });

  const updateForm = (key: keyof RegisterForm, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    const totalSelectedExtra = extraItems.reduce((t, e) => {
      if(form.extra.find((id) => id === e.id)) return t += e.price;
      return t;
    },0);

    form.extra.length === extraItems.length ? total = (total + totalSelectedExtra)*0.8 : total = total + totalSelectedExtra
    return total;
  };

  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname === "",
      lname: form.lname === "",
      plan: form.plan === "",
      gender: form.gender === "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((isError) => isError);
    if (hasError) return;

    const total = computeTotalPayment();
    // to แจ้งขึ้น
    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
    );
  };

  return (
    <div
      className="modal fade show d-block"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          {/* header and close button */}
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5> 
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>


          <div className="modal-body">
            <div className="d-flex gap-2">
              
              {/* first name */}
              <div>
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                  onChange={(e) => updateForm("fname", e.target.value)}
                  value={form.fname}
                />
                <div className="invalid-feedback">Invalid first name</div>
              </div>

              {/* last name */}
              <div>
                <label className="form-label">Last name</label>
                <input 
                  className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                  onChange={(e) => updateForm("lname", e.target.value)}
                  value={form.lname}
                />
                <div className="invalid-feedback">Invalid first name</div>
              </div>
            </div>

            {/* select plans */}
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={"form-select" + (errors.plan ? " is-invalid" : "")}
                onChange={(e) => updateForm("plan", e.target.value)}
                value={form.plan}
              >
                <option value="">Please select..</option>
                {plans.map((p)=> (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.price.toLocaleString()} THB)
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select a Plan</div>
            </div>

            {/* select gender */}
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio" //radio type ทำให้เลือกได้แค่อันเดียว
                  checked={form.gender === "male"}
                  onChange={() => updateForm("gender", "male")}
                />
                Male 👨
                <input
                  className="me-2 form-check-input"
                  type="radio" //radio type ทำให้เลือกได้แค่อันเดียว
                  checked={form.gender === "female"}
                  onChange={() => updateForm("gender", "female")}
                />
                Female 👩
              </div>
              {
                errors.gender && <div className="text-danger">Please select gender</div>
              }
            </div>

            {/* Extra Items */}
            <div>
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input 
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={form.extra.includes("bottle")}
                  onChange={(e) => {
                    const newextra = e.target.checked ? [...form.extra, "bottle"] : form.extra.filter((id) => id !== "bottle");
                    updateForm("extra", newextra);
                  }}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={form.extra.includes("shoes")}
                  onChange={(e) => {
                    const newextra = e.target.checked ? [...form.extra, "shoes"] : form.extra.filter((id) => id !== "shoes");
                    updateForm("extra", newextra);
                  }}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input 
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={form.extra.includes("cap")}
                  onChange={(e) => {
                    const newextra = e.target.checked ? [...form.extra, "cap"] : form.extra.filter((id) => id !== "cap");
                    updateForm("extra", newextra);
                  }}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>
              {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
              <span className="text-success d-block">(20% Discounted)</span>
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div>
              Total Payment : {computeTotalPayment().toLocaleString()} THB
            </div>
          </div>

          <div className="modal-footer">
            <div>
              <input 
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I agree to the terms and conditions
            </div>
            <button 
              className="btn btn-success my-2"
              onClick={registerBtnOnClick}
              disabled={!agree}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
