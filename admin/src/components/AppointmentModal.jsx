  <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{appointment.userData?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{appointment.userData?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{appointment.userData?.phone}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Doctor Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{appointment.doctorData?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Specialization</p>
            <p className="font-medium">{appointment.doctorData?.specialization}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{appointment.doctorData?.address}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{appointment.slotDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{appointment.slotTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">{currency}{appointment.amount.toLocaleString('vi-VN')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              appointment.isCompleted ? 'bg-green-100 text-green-800' :
              appointment.cancelled ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {appointment.isCompleted ? 'Completed' :
               appointment.cancelled ? 'Cancelled' :
               'Pending'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        {!appointment.isCompleted && !appointment.cancelled && (
          <>
            <button
              onClick={() => handleComplete(appointment._id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Complete
            </button>
            <button
              onClick={() => handleCancel(appointment._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div> 