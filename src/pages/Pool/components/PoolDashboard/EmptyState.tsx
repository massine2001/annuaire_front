import React from "react";
import "./style.css";

const EmptyState = () => {
  return (
    <div className="pool-dashboard pool-dashboard__empty">
      <span className="pool-dashboard__empty-icon">📂</span>
      <p className="pool-dashboard__empty-text">
        Sélectionnez une pool pour afficher ses détails
      </p>
    </div>
  );
};

export default EmptyState;