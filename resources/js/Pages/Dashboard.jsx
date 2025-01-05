import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Head, useForm, usePage } from '@inertiajs/react';

function Dashboard({ user, musics }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
    const { data, setData, get, post } = useForm({
        search: "",
        sort_by: sortBy,
        sort_direction: sortDirection,
    });

    const { errors } = usePage().props;

    const filteredMusics = musics.filter((music) =>
        music.title.toLowerCase().includes(search.toLowerCase()) ||
        music.artist.toLowerCase().includes(search.toLowerCase())
    );

    const handleSort = (field) => {
        const newDirection = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortDirection(newDirection);

        setData({ ...data, sort_by: field, sort_direction: newDirection });

        get(route('dashboard'), { preserveState: true });
    };

    const handleDelete = (musicId) => {
        Swal.fire({
            title: 'Are you sure you want to delete this music?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/delete/music/${musicId}`;
            }
        });
    };

    const isValidLink = (link) => {
        if (!link) return false;

        try {
            new URL(link); // Check if the link is a valid URL
            return true;
        } catch (error) {
            return false;
        }
    };

    const getPreview = (link) => {
        if (!isValidLink(link)) return null;

        // YouTube Preview
        if (link.includes("youtube.com") || link.includes("youtu.be")) {
            const videoId = link.split('v=')[1]?.split('&')[0] || link.split('/').pop();
            return (
                <iframe
                    width="200" 
                    height="113" 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    title="YouTube Video"
                ></iframe>
            );
        }

        // You can add more preview types for other platforms (like Vimeo, etc.)
        return <span className="text-gray-500">No preview available</span>;
    };

    useEffect(() => {
        if (flash) {
            Swal.fire({
                title: 'Success!',
                text: flash,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Music
                </h2>
            }
        >
            <Head title="Music" />

            <div className="overflow-x-auto p-10">
                <div className="mb-4">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search music by title or artist..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4 flex space-x-4">
                    <button
                        onClick={() => handleSort("title")}
                        className="inline-block rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                        Sort by Title ({sortBy === 'title' && sortDirection === 'asc' ? 'asc' : 'desc'})
                    </button>
                    <button
                        onClick={() => handleSort("artist")}
                        className="inline-block rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                        Sort by Artist ({sortBy === 'artist' && sortDirection === 'asc' ? 'asc' : 'desc'})
                    </button>
                </div>

                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Title</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Artist</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Link</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date Added</th>
                            <th className="px-4 py-2 flex flex-row-reverse">
                                <a href={route('music.addview')} title="add music" className="add-button bg-green-500 hover:bg-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                                </a>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {filteredMusics.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center text-gray-700">
                                    No music found.
                                </td>
                            </tr>
                        ) : (
                            filteredMusics.map((music) => (
                                <tr key={music.id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{music.title}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{music.artist}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex justify-center">
                                        {getPreview(music.music_link)}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                        {new Date(music.created_at).toISOString().split("T")[0]}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 space-x-2 text-right">
                                        <a
                                            href={`/edit/music/${music.id}`}
                                            className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            onClick={() => handleDelete(music.id)}
                                            className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;