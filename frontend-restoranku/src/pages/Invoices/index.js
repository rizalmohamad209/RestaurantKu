import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { getInvoiceById } from '../../api/invoices'
import { LayoutOne, Text, Table } from 'upkit';
import Topbar from '../../components/Topbar'
import BounceLoader from 'react-spinners/BounceLoader'
import StatusLabel from '../../components/StatusLabel'
import { config } from '../../config/config'


export default function Invoices() {

    let [invoices, setInvoices] = useState(null)
    let [error, setError] = useState(null)
    console.log("ini invoices", invoices);
    console.log(error);
    let [status, setStatus] = useState("process")

    let { params } = useRouteMatch()

    useEffect(() => {
        getInvoiceById(params?.order_id)
            .then(({ data }) => {
                if (data === null) {
                    setError(data.message || "Terjadi kesalahan yang tidak diketahui")
                }
                setInvoices(data.data)
            })
            .finally(() => setStatus('idle'))
    }, [params])
    if (error !== null) {
        return (
            <LayoutOne>
                <Topbar />
                <Text as='h3'>Terjadi Kesalahan</Text>
                {error}
            </LayoutOne>
        )
    }

    if (status === "process") {
        return (
            <LayoutOne>
                <div className='text-center py-10'>
                    <div className='inline-block'>
                        <BounceLoader color='red' />
                    </div>
                </div>
            </LayoutOne>
        )
    }
    return (
        <div className='mb-10'>
            <LayoutOne>
                <Topbar />

                <h1 className='text-3xl text-center'>Invoice</h1>
                <br />
                <Table
                    showPagination={false}
                    items={[
                        { label: "Status", value: <StatusLabel status={invoices.status} /> },
                        {
                            label: 'Order ID', value: '#' + invoices?.order_id
                        },
                        { label: 'Total amount', value: invoices?.sub_total },
                        {
                            label: 'Billed to', value: <div>
                                <b>{invoices?.users?.full_name}</b> <br />
                                {invoices?.users?.email} <br /><br />
                                {invoices?.addresses?.detail_pengiriman} <br /><br />
                                {invoices?.addresses?.kelurahan} <br /><br />
                                {invoices?.addresses?.kecamatan} <br /><br />
                                {invoices?.addresses?.kabupaten} <br /><br />
                                {invoices?.addresses?.provinsi}
                            </div>
                        },
                        {
                            label: 'Payment to', value: <div>
                                {config.owner} <br />
                                {config.contact} <br />
                                {config.billing.account_no} <br />
                                {config.billing.bank_name}
                            </div>
                        },


                    ]}
                    columns={[
                        { Header: 'Invoice', accessor: 'label' },
                        { Header: '', accessor: 'value' },
                    ]}
                />


            </LayoutOne>
        </div >
    )
}
