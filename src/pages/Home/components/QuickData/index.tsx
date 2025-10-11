import { useEffect, useState } from "react";
import { fetchPoolsCount, fetchFilesCount, fetchUsersCount } from "../../../../api/homePageApi";
import './style.css';
interface FetchedData {
    pools: number | null,
    users: number | null,
    files: number | null,
}

const QuickData: React.FC = () => {
const [fetchedData, setFetchedData] = useState<FetchedData>({
    pools: null,
    users: null,
    files: null,
});

const fetchQuickData = async () => {
    const [pools, users, files] = await Promise.all([
        fetchPoolsCount(),
        fetchUsersCount(),
        fetchFilesCount(),
    ])

    setFetchedData({pools, users, files})
}

useEffect(() => {
    fetchQuickData();
}, [])

    return (
        <div className="quickData">
    <h2>Statistiques rapides</h2>
    <div className="statsGrid">
        <div className="statCard">
            <span className="icon">📊</span>
            <div>
                <p className="label">Pools</p>
                <p className="value">{fetchedData.pools ?? '...'}</p>
            </div>
        </div>
        <div className="statCard">
            <span className="icon">👥</span>
            <div>
                <p className="label">Utilisateurs</p>
                <p className="value">{fetchedData.users ?? '...'}</p>
            </div>
        </div>
        <div className="statCard">
            <span className="icon">📁</span>
            <div>
                <p className="label">Fichiers</p>
                <p className="value">{fetchedData.files ?? '...'}</p>
            </div>
        </div>
        <div className="statCard">
            <span className="icon">🟩</span>
            <div>
                <p className="label">Personnes connectées</p>
                <p className="value">{fetchedData.files ?? '...'}</p>
            </div>
        </div>
    </div>
</div>

    )
}

export default QuickData;