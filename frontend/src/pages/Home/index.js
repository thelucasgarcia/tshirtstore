import React from 'react';
import Swal from 'sweetalert2';
import ListProducts from '../../components/ListProducts';
import api from '../../services/api';

function Home() {

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        function loadPosts() {
            api.get('/products/all').then(({ data }) => {
                setProducts(data);
            }).catch(error => {
                Swal.fire("Error!", error.message, "error");
            });
        }

        loadPosts();
    }, [])
    return (
        <main className="container">
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="col-md-12 px-0">
                    <h1 className="display-4 font-italic">Welcome to the free online diary</h1>
                    <p className="lead my-3">This is an online diary service, providing personal diaries and journals. <br /> Go ahead and register your own public diary today.</p>
                </div>
            </div>

            <ListProducts products={products} />

        </main>
    );
}

export default Home;