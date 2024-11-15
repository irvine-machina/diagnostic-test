"use client"
import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react'

export default function DiagnosticTest() {
  const [step, setStep] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [timerActive, timer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const steps = [
    {
      title: "Preparation",
      instructions: [
        "Wash hands thoroughly with soap and water",
        "Clear a clean, flat surface",
        "Check test kit contents",
        "Read all instructions first"
      ],
      warning: "Ensure all materials are present before starting",
      success: "Great! You're ready to begin the test."
    },
    {
      title: "Sample Collection",
      instructions: [
        "Open the sterile swab package",
        "Follow collection instructions carefully",
        "Place sample in solution tube",
        "Mix well according to instructions"
      ],
      warning: "Do not touch the swab tip or let it contact any surface",
      success: "Sample collected successfully!"
    },
    {
      title: "Test Processing",
      instructions: [
        "Add exactly the specified drops to test device",
        "Start the timer immediately",
        "Keep the device flat and stable",
        "Wait for the full testing period"
      ],
      warning: "Do not move or disturb the test device during processing",
      success: "Test is processing correctly."
    },
    {
      title: "Results",
      instructions: [
        "Check that the control line is visible",
        "Read results according to package instructions",
        "Document your results if needed",
        "Dispose of all materials properly"
      ],
      warning: "If control line is not visible, the test is invalid",
      success: "You've completed the test correctly!"
    }
  ]

  return (
    <main className="p-8 max-w-2xl mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">At-Home Diagnostic Test Assistant</h1>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                  ${index < step ? 'border-green-500 bg-green-500 text-white' : 
                    index === step ? 'border-blue-500 bg-blue-500 text-white' : 
                    'border-gray-300 text-gray-700'}`}
              >
                {index < step ? <CheckCircle className="w-6 h-6" /> : index + 1}
              </div>
              <div className="text-xs mt-1 text-gray-600">Step {index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Current step */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-black flex items-center gap-2">
          {steps[step].title}
          {step < 3 && <span className="text-sm font-normal text-gray-500">Step {step + 1} of 4</span>}
        </h2>
        
        {/* Warning message */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-700">{steps[step].warning}</p>
        </div>

        <ul className="space-y-4 text-gray-700 mb-6">
          {steps[step].instructions.map((instruction, index) => (
            <li key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <span className="text-blue-500 font-bold">{index + 1}.</span>
              {instruction}
            </li>
          ))}
        </ul>

        {/* Timer for step 2 */}
        {step === 2 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Test Timer</span>
              </div>
              <span className="text-4xl font-mono font-bold text-blue-600">{formatTime(timer)}</span>
            </div>
            <button
              onClick={() => {
                if (!timerActive && timer === 0) setTimer(900); // 15 minutes
                setTimerActive(!timerActive);
              }}
              className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {timer === 0 ? "Start Timer (15:00)" : timerActive ? "Pause" : "Resume"}
            </button>
          </div>
        )}

        {/* Success message */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {steps[step].success}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={step === steps.length - 1}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </main>
  )
}