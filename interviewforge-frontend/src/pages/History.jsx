import { useEffect, useState } from "react";

import api from "../services/api";

import Card from "../components/ui/Card";


function History() {


    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        async function loadHistory() {


            try {


                const response = await api.get("/history/");


                console.log(
                    "HISTORY:",
                    response.data
                );


                setHistory(response.data);



            } catch (error) {


                console.log(
                    error.response?.data
                );


            } finally {


                setLoading(false);


            }


        }



        loadHistory();


    }, []);




    if (loading) {

        return <h2>Loading history...</h2>;

    }




    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                Interview History
            </h1>


            <br />


            {
                history.length === 0 ? (

                    <h3>
                        No interviews completed yet.
                    </h3>

                ) : (

                    history.map((item, index) => (

                        <Card key={index}>

                            <h2>
                                Interview #{index + 1}
                            </h2>


                            <p>
                                Overall Score: {item.overall_score ?? "N/A"}
                            </p>


                        </Card>

                    ))

                )
            }


        </div>

    );

}


export default History;