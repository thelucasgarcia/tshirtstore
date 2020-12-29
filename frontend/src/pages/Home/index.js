import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../services/api';

function Home() {
    const [products, setProducts] = React.useState([]);
    const history = useHistory();

    React.useEffect(() => {
        function loadPosts() {
            api.get('/product/all').then(({ data }) => {
                setProducts(data);
            }).catch(error => {
                Swal.fire("Error!", error.message, "error");
            });
        }
        loadPosts();
    }, []);

    return (
        <main className="container mt-5">
            <div className="container">
                <div className="row mb-2 card-group">
                    {products.length ? products.map((item, key) => (
                        <div className="col-md-3" key={key}>
                            <div className="card border border-white m-3" onClick={() => history.push(`/product/${item.id}`)}>
                                <img src={item.image} style={{ objectFit: "scale-down" }} className="card-img-top" alt={item.name} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="h5 fw-bold text-muted" >€ {parseFloat(item?.price)?.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )) : <p className="lead mt-5">No products found.</p>}
                </div>
            </div>
        </main>
    );
}

export default Home;