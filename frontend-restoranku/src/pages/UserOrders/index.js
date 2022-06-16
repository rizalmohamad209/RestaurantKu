import React, { useState, useEffect, useCallback } from 'react'
import { LayoutOne, Table, Button, Text } from 'upkit';
import { Link } from 'react-router-dom';
import Topbar from '../../components/Topbar'
import { getOrders } from '../../api/order'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import StatusLabel from '../../components/StatusLabel'

const columns = [
    {
        Header: 'Order ID',
        id: 'Status',
        accessor: order => {
            return <div>
                #{order.id} <br />
                <StatusLabel status='{order.status}' />
            </div>
        }
    },
    {
        Header: 'Nama',
        accessor: order => {
            return <div>
                {order.orderItems.map(item => {
                    return <div key={item.id}>
                        {item.productss.name_products}{item.qty}
                    </div>
                })}
            </div>
        }
    },
    {
        Header: 'Total',
        accessor: order => {
            return <div>
                {order.totalHarga + order.ongkir}
            </div>
        }
    },
    {
        Header: 'Invoice',
        accessor: order => {
            return <div>
                <Link to={`/invoices/${order.id}`}>
                    <Button color="gray" iconBefore={<FaFileInvoiceDollar />}>
                        Invoice
                    </Button>
                </Link>
            </div>
        }
    }
]

export default function UserOrders() {

    let [pesanan, setPesanan] = useState([]);
    let [count, setCount] = useState(0);
    let [status, setStatus] = useState('idle');
    let [page, setPage] = useState(1);
    let [limit,] = useState(10);

    const fetchPesanan = useCallback(async () => {
        setStatus("process");

        let { data } = await getOrders();

        if (data.error) {
            setStatus('error');
            return;
        }
        setStatus('success');
        setPesanan(data.data);
        setCount(data.count);
    }, []);

    useEffect(() => {
        fetchPesanan();
    }, [fetchPesanan]);

    return (
        <div>
            <LayoutOne>
                <Topbar />

                <h1 className='text-3xl text-center'>Pesanan Anda</h1>
                <br />

                <Table
                    items={pesanan}
                    totalItems={count}
                    columns={columns}
                    onPageChange={page => setPage(page)}
                    page={page}
                    isLoading={status === "process"}
                />
            </LayoutOne>
        </div>
    )
}
