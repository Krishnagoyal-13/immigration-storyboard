import React from 'react'
import { SendIcon } from 'lucide-react'
export const EmailSignup = () => {
  return (
    <section className="w-full py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Want reminders about visa deadlines and updates?
          </h2>
          <p className="text-lg text-gray-300">
            Stay informed about important immigration changes and deadlines with
            our free email service.
          </p>
        </div>
        <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
          >
            Keep Me Informed
            <SendIcon className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
