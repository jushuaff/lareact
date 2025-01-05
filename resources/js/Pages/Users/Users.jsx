import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import React from 'react';
import { Head } from '@inertiajs/react';

export default function Users({ user, users }){
    return(
        <AuthenticatedLayout
            user = {user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users Management
                </h2>
            }
        >
            <Head title="Users Management" />

            <Table users = {users}/>

        </AuthenticatedLayout>
        
    );
}