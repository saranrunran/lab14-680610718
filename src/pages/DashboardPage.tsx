import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useState, useEffect } from "react";

const STORAGE_KEY = "lab14.cards";

function loadCards(): Registrant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultCards;
  } catch {
    return defaultCards;
  }
}

const defaultCards: Registrant[] = [];

export default function DashboardPage() {
  const [cards] = useState<Registrant[]>(loadCards);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {/* Conditional Rendering + Render Component */}
      {cards.length === 0 ? <p className="text-muted">ยังไม่มีผู้ลงทะเบียน</p> : (
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
