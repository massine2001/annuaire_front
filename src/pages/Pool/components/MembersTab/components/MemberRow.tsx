import { memo } from "react";
import type { User } from "../../../../../types/models";

type Props = {
  member: User;
  role?: string;
  onViewDetails: () => void;
  onChangeRole: () => void;
  onRemove: () => void;
};

export const MemberRow = memo(({ member, role, onViewDetails, onChangeRole, onRemove }: Props) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return '#ff6b6b';
      case 'member':
        return '#4ecdc4';
      default:
        return '#a8dadc';
    }
  };

  return (
    <div className="members-tab__member">
      <div 
        className="members-tab__member-avatar" 
        style={{ backgroundColor: getAvatarColor(role) }}
      >
        {getInitials(member.firstName, member.lastName)}
      </div>

      <div className="members-tab__member-info">
        <div className="members-tab__member-name">
          {member.firstName} {member.lastName}
        </div>
        <div className="members-tab__member-meta">
          <span>{member.email}</span>
          {role && (
            <>
              <span>•</span>
              <span className="members-tab__member-role">{role}</span>
            </>
          )}
        </div>
      </div>

      <div className="members-tab__member-actions">
        <button
          className="members-tab__action-btn"
          title="Détails"
          onClick={onViewDetails}
        >
          ℹ️
        </button>
        <button
          className="members-tab__action-btn"
          title="Modifier le rôle"
          onClick={onChangeRole}
        >
          ✏️
        </button>
        <button
          className="members-tab__action-btn members-tab__action-btn--danger"
          title="Retirer de la pool"
          onClick={onRemove}
        >
          🗑️
        </button>
      </div>
    </div>
  );
});

MemberRow.displayName = "MemberRow";
