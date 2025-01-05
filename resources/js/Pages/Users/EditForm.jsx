import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditForm({user, user_details}) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: user_details.id,
        name: user_details.name,
        email: user_details.email
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('users.update'));
    }

    return (
        <AuthenticatedLayout
            user = {user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Profile: {data.name}
                </h2>
            }
            
        >
            <Head title={user_details.name} />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <div>
                            <TextInput type="text" className="w-full" placeholder="name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div>
                            <TextInput type="email" className="w-full" placeholder="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}