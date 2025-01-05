import React from "react";

export default function Table({users}){
    return(
        <div className="overflow-x-auto p-10">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Name</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Email</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date Registered</th>
                    <th className="px-4 py-2"></th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {!users || users.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 text-center text-gray-700">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                    {new Date(user.created_at).toISOString().split("T")[0]}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 space-x-2">
                                    <a
                                        href={`/edit/user/${user.id}`}
                                        className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                                    >
                                        Edit
                                    </a>
                                    <a
                                        href={`/delete/user/${user.id}`}
                                        className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
        </div>
    )
}