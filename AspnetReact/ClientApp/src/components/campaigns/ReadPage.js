import React, { useEffect, useState } from 'react';
import CampaignCard from "./CampaignCard"

export default function ReadPage(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState(undefined);

    useEffect(() => {
        fetch("/api/campaign/"+props.match.params.id)
            .then(res => res.json())
            .then(
                (result) => { setIsLoaded(true); setItem(result); },
                (error) => { setIsLoaded(true); setError(error); }
            )
    }, [props.match.params.id])

    if (error) return <div>Ошибка: {error.message}</div>;
    else if (!isLoaded) return <div>Загрузка...</div>;
    else if (!item) return <div>Пока в базе отсутствуют записи</div>;
    else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Campaigns</h1>
                <div className="d-flex justify-content-center align-items-stretch flex-wrap">
                    <CampaignCard campaign={item} />
                </div>
            </div>
        );
    }
}

// class CampaignPageOld extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             result: []
//         };
//     }

//     componentDidMount() {
//         fetch("/api/campaign/"+this.props.match.params.id)
//             .then(res => res.json())
//             .then(
//                 (json) => {this.setState({isLoaded: true, result: json});},
//                 (error) => {this.setState({isLoaded: true, error});}
//             )
//     }

//     render() {
//         const { error, isLoaded, result } = this.state;
//         if (error) return <div>Ошибка: {error.message}</div>;
//         else if (!isLoaded) return <div>Загрузка...</div>;
//         else if (!result) return <div>Пока в базе отсутствуют записи</div>;
//         else {
//             return (
//                 <div className="d-flex flex-column justify-content-center align-items-center">
//                     <h1>Campaigns</h1>
//                     <div className="d-flex justify-content-center align-items-stretch flex-wrap">
//                         <CampaignCard campaign={result} />
//                     </div>
//                 </div>
//             );
//         }
//         }
// }

