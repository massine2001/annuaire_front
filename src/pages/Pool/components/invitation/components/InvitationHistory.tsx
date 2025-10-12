import "./InvitationHistory.css";

type InvitationHistoryItem = {
  email: string;
  sentAt: string;
  status: "pending" | "accepted" | "expired";
};

type Props = {
  invitations: InvitationHistoryItem[];
};

const InvitationHistory = ({ invitations }: Props) => {
  if (invitations.length === 0) {
    return (
      <div className="invitation-history">
        <h3 className="invitation-history__title">📜 Historique des invitations</h3>
        <div className="invitation-history__empty">
          <span className="invitation-history__empty-icon">📭</span>
          <p>Aucune invitation envoyée pour le moment</p>
          <p className="invitation-history__empty-hint">
            Les invitations que vous enverrez apparaîtront ici
          </p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: InvitationHistoryItem["status"]) => {
    switch (status) {
      case "pending":
        return { label: "En attente", className: "invitation-history__badge--pending" };
      case "accepted":
        return { label: "Acceptée", className: "invitation-history__badge--accepted" };
      case "expired":
        return { label: "Expirée", className: "invitation-history__badge--expired" };
    }
  };

  return (
    <div className="invitation-history">
      <h3 className="invitation-history__title">📜 Historique des invitations</h3>
      
      <div className="invitation-history__list">
        {invitations.map((invitation, index) => {
          const badge = getStatusBadge(invitation.status);
          
          return (
            <div key={index} className="invitation-history__item">
              <div className="invitation-history__item-info">
                <span className="invitation-history__item-email">{invitation.email}</span>
                <span className="invitation-history__item-date">
                  Envoyée le {new Date(invitation.sentAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              
              <span className={`invitation-history__badge ${badge.className}`}>
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvitationHistory;
