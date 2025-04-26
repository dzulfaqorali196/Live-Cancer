interface ProgressBarProps {
    percentage: number
  }
  
  export default function ProgressBar({ percentage }: ProgressBarProps) {
    return (
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
  