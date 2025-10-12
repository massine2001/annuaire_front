import { useEffect } from "react";
import DocumentForm, { type DocumentFormData } from "./DocumentForm";
import { uploadFile } from "../../../../../api/filePageApi";
import { useMutation } from "../../../../../hooks/useMutation";
import { useToast } from "../../../../../hooks/useToast";
import { Toast } from "../../../../../components/Toast";
import '../style.css';

type Props = {
    poolId: number;
};

const AddDocument = ({ poolId }: Props) => {
    const { toast, showSuccess, showError, hideToast } = useToast();
    
    const { execute, loading, success, error } = useMutation(
        (data: DocumentFormData) => uploadFile(
            data.file!,
            poolId,
            1, // TODO: Get userId from auth context
            data.description,
            data.expirationDate
        )
    );

    const handleSubmit = async (data: DocumentFormData) => {
        if (!data.file) return;
        await execute(data);
    };

    // Notifications
    useEffect(() => {
        if (success) {
            showSuccess("Document ajouté avec succès");
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            showError("Erreur lors de l'ajout du document");
        }
    }, [error]);

    return (
        <div className="document-form_wrapper">
                      
            <DocumentForm
                key={success ? Date.now() : 'form'}
                onSubmit={handleSubmit}
                submitLabel="📎 Ajouter le document"
                isEdit={false}
                loading={loading}
                success={success}
                error={error}
            />

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

export default AddDocument;