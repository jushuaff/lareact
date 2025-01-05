<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function loadUsers(){
        $user = auth()->user();
        $users = User::where('id', '!=', $user->id)->get();

        return Inertia::render('Users/Users', [
            'user' => $user,
            'users' => $users
        ]);
    }

    public function loadEditForm($user_id){
        $user = auth()->user();
        $userDetails = User::find($user_id);
        return Inertia::render('Users/EditForm',[
            'user'=>$user,
            'user_details' => $userDetails
        ]);
    }

    public function editUser(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255'
        ]);

        $user = User::find($request->user_id);
        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'User not found.']);
        }

        $user->update([
            'name' => strip_tags($request->name),
            'email' => strip_tags($request->email)
        ]);

        return to_route('users.index')->with('success', 'User updated successfully.');
    }

    public function deleteUser($user_id) {
        $user = User::find($user_id);

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'User not found.']);
        }

        $user->delete();

        return to_route('users.index')->with('success', 'User deleted successfully.');
    }

}
