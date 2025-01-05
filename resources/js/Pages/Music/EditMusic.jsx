import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import React from 'react'
import { Head, useForm } from '@inertiajs/react';

export default function EditMusic({music, errors}) {
    const { data, setData, post, processing } = useForm({
        music_id: music.id,
        title: music.title,
        artist: music.artist,
        music_link: music.music_link
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('music.update'));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Music: {data.title}
                </h2>
            }
        >
            <Head title={data.title} />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    
                    <div>
                        <label htmlFor="title" className="sr-only">Title</label>
                        <div>
                            <TextInput
                                type="text"
                                className={`w-full ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && (
                                <span className="text-red-500 text-xs mt-1">{errors.title}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="artist" className="sr-only">Artist</label>
                        <div>
                            <TextInput
                                type="text"
                                className={`w-full ${errors.artist ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Artist"
                                value={data.artist}
                                onChange={(e) => setData('artist', e.target.value)}
                            />
                            {errors.artist && (
                                <span className="text-red-500 text-xs mt-1">{errors.artist}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="music_link" className="sr-only">Music Link</label>
                        <div>
                            <TextInput
                                type="text"
                                className={`w-full ${errors.music_link ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Music Link"
                                value={data.music_link}
                                onChange={(e) => setData('music_link', e.target.value)}
                            />
                            {errors.music_link && (
                                <span className="text-red-500 text-xs mt-1">{errors.music_link}</span>
                            )}
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