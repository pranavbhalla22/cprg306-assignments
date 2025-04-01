"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-5 text-center">Shopping List App</h1>
      
      <div className="space-y-4">
        {user ? (
          <>
            <p className="text-gray-700">
              Signed in as <span className="font-semibold">{user.displayName}</span> ({user.email})
            </p>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={firebaseSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Sign out
              </button>
              
              <Link 
                href="/week-10/shopping-list"
                className="px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition"
              >
                Continue to Shopping List
              </Link>
            </div>
          </>
        ) : (
          <button 
            onClick={gitHubSignIn}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </div>
  );
}