// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from "@default/ui/primitives/button"
import { Calendar } from "@default/ui/primitives/calendar"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@default/ui/primitives/card"

const WithTodayButtonDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 15))
  const [month, setMonth] = useState<Date | undefined>(new Date())

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Book the appointment</CardTitle>
          <CardAction>
            <Button
              size='sm'
              onClick={() => {
                setMonth(new Date())
                setDate(new Date())
              }}
              className="hover:bg-primary/80 cursor-pointer"
            >
              Today
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Calendar
            mode='single'
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={setDate}
            className='bg-transparent p-0'
          />
        </CardContent>
      </Card>
    </>
  )
}

export default WithTodayButtonDemo
