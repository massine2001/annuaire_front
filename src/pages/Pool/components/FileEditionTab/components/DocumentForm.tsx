import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import '../style.css';

export interface DocumentFormData {
    name: string;
    description?: string;
    expirationDate?: string;
    file?: File;
}

type Props = {
    initialData?: Partial<DocumentFormData>;
    onSubmit: (data: DocumentFormData) => void;
    submitLabel?: string;
    isEdit?: boolean;
    loading?: boolean;
    success?: boolean;
    error?: string | null;
    disabled?: boolean;
};

const DocumentForm = ({ 
    initialData, 
    onSubmit, 
    submitLabel = "Enregistrer",
    isEdit = false,
    loading = false,
    success = false,
    error: externalError = null,
    disabled = false
}: Props) => {
    const [name, setName] = useState(initialData?.name ?? "");
    const [description, setDescription] = useState(initialData?.description ?? "");
    const [expirationDate, setExpirationDate] = useState(initialData?.expirationDate ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const prevSuccessRef = useRef(false);

    const initialForm = () => {
        setName("");
        setDescription("");
        setExpirationDate("");
        setFile(null);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!name.trim()) {
            setError("Le nom est requis");
            return;
        }
        if (!isEdit && !file) {
            setError("Le fichier est requis");
            return;
        }

        onSubmit({ 
            name, 
            description: description || undefined,
            expirationDate: expirationDate || undefined,
            file: file ?? undefined 
        });
    };

    useEffect(() => {
        if (success && !prevSuccessRef.current && !isEdit) {
            initialForm();
        }
        prevSuccessRef.current = success;
    }, [success, isEdit]);

    const displayError = error || externalError;

    return (
        <form onSubmit={handleSubmit}>
            <section className="document-form__section">
                <div className="document-form__grid">
                    <div className="document-form__field">
                        <span className="document-form__label">Nom *</span>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ex: Passeport français"
                            required
                        />
                    </div>

                    <div className="document-form__field">
                        <span className="document-form__label">
                            Fichier {isEdit ? "(optionnel)" : "*"}
                        </span>
                        <input 
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            required={!isEdit}
                            id="file-input"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-input" className="file-input-label">
                            <span className="file-input-icon">📁</span>
                            {file ? file.name : "Choisir un fichier"}
                        </label>
                        {file && (
                            <div className="file-preview">
                                <span className="file-preview-icon">📄</span>
                                <div className="file-preview-info">
                                    <span className="file-preview-name">{file.name}</span>
                                    <span className="file-preview-size">
                                        {(file.size / 1024).toFixed(2)} Ko
                                    </span>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="file-preview-remove"
                                    title="Retirer le fichier"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        {isEdit && !file && (
                            <small style={{ fontSize: "0.75rem", color: "#666" }}>
                                Laissez vide pour conserver le fichier actuel
                            </small>
                        )}
                    </div>

                    <div className="document-form__field">
                        <span className="document-form__label">Date d'expiration du document</span>
                        <input 
                            type="date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                    </div>

                     <div className="document-form__field">
                        <span className="document-form__label">Description</span>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Informations complémentaires..."
                            rows={3}
                        />
                    </div>

                    {displayError && (
                        <div className="document-form__field">
                            <div className="form-error">
                                {displayError}
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="document-form__field">
                            <div className="form-success">
                                ✓ {isEdit ? "Document modifié avec succès !" : "Document ajouté avec succès !"}
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="document-form__field">
                            <div className="form-loading">
                                <span className="spinner"></span>
                                {isEdit ? "Modification en cours..." : "Ajout en cours..."}
                            </div>
                        </div>
                    )}
                </div>

                <div className="document-form__actions">
                    <button 
                        type="button" 
                        onClick={() => initialForm()}
                        className="fileEdition-chip-btn"
                        disabled={disabled}
                    >
                        Annuler
                    </button>
                    <button 
                        type="submit"
                        className="fileEdition-chip-btn-active"
                        disabled={disabled || loading}
                        style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        {submitLabel}
                    </button>
                </div>
            </section>
        </form>
    );
}

export default DocumentForm;