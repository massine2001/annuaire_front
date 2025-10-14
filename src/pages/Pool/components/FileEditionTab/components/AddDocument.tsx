import { useEffect, useRef } from "react";
import DocumentForm, { type DocumentFormData } from "./DocumentForm";
import { uploadFile } from "../../../../../api/filePageApi";
import { useMutation } from "../../../../../hooks/useMutation";
import { useToast } from "../../../../../hooks/useToast";
import { Toast } from "../../../../../components/Toast";
import '../style.css';

type Props = {
    poolId: number;
    isPublicView?: boolean;
};

const AddDocument = ({ poolId, isPublicView = false }: Props) => {
    const { toast, showSuccess, showError, hideToast } = useToast();
    
    const { execute, loading, success, error } = useMutation(
        (data: DocumentFormData) => uploadFile(
            data.file!,
            poolId,
            data.description,
            data.expirationDate
        )
    );
    
    const successHandledRef = useRef(false);
    
    const showSuccessRef = useRef(showSuccess);
    const showErrorRef = useRef(showError);
    const hideToastRef = useRef(hideToast);
    
    useEffect(() => {
        showSuccessRef.current = showSuccess;
        showErrorRef.current = showError;
        hideToastRef.current = hideToast;
    });

    const handleSubmit = async (data: DocumentFormData) => {
        if (!data.file) return;
        await execute(data);
    };

    useEffect(() => {
        if (success && !successHandledRef.current) {
            successHandledRef.current = true;
            showSuccessRef.current("Document ajouté avec succès");
            
            const timer = setTimeout(() => {
                hideToastRef.current();
                successHandledRef.current = false;
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            showErrorRef.current("Erreur lors de l'ajout du document");
        }
    }, [error]);

    return (
        <div className="document-form_wrapper">
            {isPublicView && (
                <div style={{ padding: '1rem', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '6px', marginBottom: '1rem' }}>
                    ⚠️ <strong>Mode démonstration</strong> : L'ajout de documents est désactivé.
                </div>
            )}
                      
            <DocumentForm
                key={success ? Date.now() : 'form'}
                onSubmit={handleSubmit}
                submitLabel="Ajouter le document"
                isEdit={false}
                loading={loading}
                success={success}
                error={error}
                disabled={isPublicView}
            />

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

export default AddDocument;