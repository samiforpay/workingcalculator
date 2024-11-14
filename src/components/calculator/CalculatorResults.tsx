'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Download } from 'lucide-react'
import { useAnnouncement } from '@/contexts/AnnouncementContext'

interface CalculatorResultsProps<T extends Record<string, number>> {
  result: T
  formatResult: (result: T) => string
}

export function CalculatorResults({ result, formatResult }: CalculatorResultsProps<T>) {
  const { announce } = useAnnouncement()
  const formattedResult = formatResult(result)

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Calculator Results',
        text: formattedResult
      })
      announce('Results shared successfully')
    } catch (error) {
      console.error('Error sharing:', error)
      announce('Failed to share results', true)
    }
  }

  const handleDownload = () => {
    try {
      const element = document.createElement('a')
      const file = new Blob([formattedResult], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = 'calculator-results.txt'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      announce('Results downloaded successfully')
    } catch (error) {
      console.error('Error downloading:', error)
      announce('Failed to download results', true)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <pre className="whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-md mb-4">
          {formattedResult}
        </pre>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 