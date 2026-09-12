import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useState } from "react";

const STORAGE_KEY = "lab14.cards";

const defaultCards: Registrant[] = [];

function loadCards(): Registrant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultCards;
  } catch {
    return defaultCards;
  }
}

export default function DashboardPage() {
  const [cards] = useState<Registrant[]>(loadCards);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Dashboard</h2>
      {cards.length === 0 ? (
        <p className="text-muted">ยังไม่มีผู้ลงทะเบียน</p>
      ) : (
        <>
          <p className="text-muted mb-2">
            ผู้ลงทะเบียนแล้ว ({cards.length} คน)
          </p>
          <div className="d-flex flex-column gap-2">
            {cards.map((card) => (
              <UserRegisterCard key={card.id} {...card} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}