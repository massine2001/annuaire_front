import { useState, useCallback, useEffect } from "react";
import DocumentSelector from "./DocumentSelector";
import { useFetch } from "../../../../../hooks/useFetch";
import { useMutation } from "../../../../../hooks/useMutation";
import { useToast } from "../../../../../hooks/useToast";
import { Toast } from "../../../../../components/Toast";
import { fetchFilesByPoolId } from "../../../../../api/poolPageApi";
import { deleteFile } from "../../../../../api/filePageApi";
import '../style.css';

type Props = {
    poolId: number;
};

const DeleteDocument = ({ poolId }: Props) => {
    const { toast, showSuccess, showError, hideToast } = useToast();
    
    const [refreshKey, setRefreshKey] = useState(0);
    const fetcher = useCallback(() => fetchFilesByPoolId(poolId), [poolId, refreshKey]);
    const { data: documents, loading: loadingDocs } = useFetch(fetcher);
    
    const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const { execute, loading, success, error, reset } = useMutation(
        () => deleteFile(selectedDocId!)
    );

    const selectedDoc = documents?.find(d => d.id === selectedDocId);

    const handleDelete = async () => {
        if (!selectedDocId) return;
        await execute(undefined);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        reset();
    };
    
    useEffect(() => {
        if (success) {
            showSuccess("Document supprimé avec succès");
            const timer = setTimeout(() => {
                setSelectedDocId(null);
                setShowConfirmation(false);
                setRefreshKey(prev => prev + 1);
            }, 2000); 
            
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            showError("Erreur lors de la suppression du document");
        }
    }, [error]);

    if (loadingDocs) {
        return <div className="document-form__section">Chargement des documents...</div>;
    }

    return (
        <div className="document-form_wrapper">
           
            <DocumentSelector
                documents={documents ?? []}
                selectedId={selectedDocId}
                onChange={setSelectedDocId}
                placeholder="Sélectionner un document à supprimer"
            />

            {!selectedDoc && (
                <div className="document-form__empty">
                    <span className="document-form__empty-icon">🗑️</span>
                    <p className="document-form__empty-text">
                        Sélectionnez un document pour le supprimer
                    </p>
                </div>
            )}

            {selectedDoc && !showConfirmation && (
                <div className="delete-document__preview">
                    <h3>Document sélectionné</h3>
                    <div className="delete-document__info">
                        <p><strong>Nom :</strong> {selectedDoc.name}</p>
                        {selectedDoc.description && (
                            <p><strong>Description :</strong> {selectedDoc.description}</p>
                        )}
                        {selectedDoc.expirationDate && (
                            <p><strong>Date d'expiration du document:</strong> {new Date(selectedDoc.expirationDate).toLocaleDateString()}</p>
                        )}
                        <p><strong>Uploadé par :</strong> {selectedDoc.userUploader?.firstName} {selectedDoc.userUploader?.lastName}</p>
                        <p><strong>Date de création :</strong> {new Date(selectedDoc.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="document-form__actions">
                        <button 
                            type="button" 
                            onClick={() => setSelectedDocId(null)}
                            className="fileEdition-chip-btn"
                        >
                            Annuler
                        </button>
                        <button 
                            type="button"
                            onClick={() => setShowConfirmation(true)}
                            className="delete-document__btn-danger"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            )}

            {showConfirmation && selectedDoc && (
                <div className="delete-document__confirmation">
                    <h3>⚠️ Confirmation de suppression</h3>
                    <p>
                        Êtes-vous sûr de vouloir supprimer le document <strong>"{selectedDoc.name}"</strong> ?
                    </p>
                    <p className="delete-document__warning">
                        Cette action est irréversible.
                    </p>
                    
                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="form-success">
                            ✓ Document supprimé avec succès !
                        </div>
                    )}
                    
                    <div className="document-form__actions">
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="fileEdition-chip-btn"
                            disabled={loading}
                        >
                            Annuler
                        </button>
                        <button 
                            type="button"
                            onClick={handleDelete}
                            className="delete-document__btn-danger"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Suppression...
                                </>
                            ) : (
                                "Confirmer la suppression"
                            )}
                        </button>
                    </div>
                </div>
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </div>
    );
};

export default DeleteDocument;