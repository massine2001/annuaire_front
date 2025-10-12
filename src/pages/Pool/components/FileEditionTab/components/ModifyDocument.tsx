import { useState, useCallback, useEffect } from "react";
import DocumentSelector from "./DocumentSelector";
import DocumentForm, { type DocumentFormData } from "./DocumentForm";
import { useFetch } from "../../../../../hooks/useFetch";
import { useMutation } from "../../../../../hooks/useMutation";
import { useToast } from "../../../../../hooks/useToast";
import { Toast } from "../../../../../components/Toast";
import { fetchFilesByPoolId } from "../../../../../api/poolPageApi";
import { updateFile } from "../../../../../api/filePageApi";
import '../style.css';

type Props = {
    poolId: number;
};

const ModifyDocument = ({ poolId }: Props) => {
    const { toast, showSuccess, showError, hideToast } = useToast();
    
    const [refreshKey, setRefreshKey] = useState(0);
    const fetcher = useCallback(() => fetchFilesByPoolId(poolId), [poolId, refreshKey]);
    const { data: documents, loading: loadingDocs } = useFetch(fetcher);
    
    const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    
    const { execute, loading, success, error } = useMutation(
        (data: DocumentFormData) => {
            if (!selectedDocId || !selectedDoc) return Promise.reject();
            
            const originalName = selectedDoc.name;
            const lastDotIndex = originalName.lastIndexOf('.');
            const extension = lastDotIndex > 0 ? originalName.substring(lastDotIndex) : '';
            
            const newName = data.name + extension;
            
            return updateFile(
                selectedDocId,
                data.file ?? undefined,
                newName,
                data.description,
                data.expirationDate
            );
        }
    );

    const selectedDoc = documents?.find(d => d.id === selectedDocId);
    
    const getNameWithoutExtension = (fullName: string) => {
        const lastDotIndex = fullName.lastIndexOf('.');
        return lastDotIndex > 0 ? fullName.substring(0, lastDotIndex) : fullName;
    };
    
    const getExtension = (fullName: string) => {
        const lastDotIndex = fullName.lastIndexOf('.');
        return lastDotIndex > 0 ? fullName.substring(lastDotIndex) : '';
    };

    const handleSubmit = async (data: DocumentFormData) => {
        if (!selectedDocId) return;
        await execute(data);
    };
    
    useEffect(() => {
        if (success) {
            showSuccess("Document modifié avec succès");
            const timer = setTimeout(() => {
                setSelectedDocId(null);
                setRefreshKey(prev => prev + 1); // Force le re-fetch
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            showError("Erreur lors de la modification du document");
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
                placeholder="Sélectionner un document à modifier"
            />

            {!selectedDoc && (
                <div className="document-form__empty">
                    <span className="document-form__empty-icon">📝</span>
                    <p className="document-form__empty-text">
                        Sélectionnez un document pour le modifier
                    </p>
                </div>
            )}

            {selectedDoc && (
                <>
                    <div className="file-extension-info">
                        <span className="file-extension-label">📎 Extension du fichier :</span>
                        <span className="file-extension-value">{getExtension(selectedDoc.name) || 'Aucune'}</span>
                        <span className="file-extension-note">L'extension sera automatiquement préservée</span>
                    </div>
                    
                    <DocumentForm
                        key={selectedDocId}
                        initialData={{
                            name: getNameWithoutExtension(selectedDoc.name),
                            description: selectedDoc.description,
                            expirationDate: selectedDoc.expirationDate,
                        }}
                        onSubmit={handleSubmit}
                        submitLabel="💾 Enregistrer les modifications"
                        isEdit={true}
                        loading={loading}
                        success={success}
                        error={error}
                    />
                </>
            )}

            {/* Toast notifications */}
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

export default ModifyDocument;