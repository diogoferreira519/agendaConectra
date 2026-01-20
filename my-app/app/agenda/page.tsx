'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Agenda() {
  const userName = 'Diogo Ferreira'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <header className="flex h-16 items-center justify-between bg-white/90 px-8 shadow backdrop-blur">
        <h1 className="text-lg font-semibold text-blue-700">
          Agenda Conectra
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {userName}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <User className="h-5 w-5" />
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mx-auto h-[calc(100vh-7rem)] w-10/12 rounded-2xl bg-white p-6 shadow-2xl flex flex-col">
          <div className="flex-col">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={ptBrLocale}
              height="100%"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              events={[
                {
                  title: 'Reunião com cliente',
                  start: '2026-01-22T10:00:00',
                  end: '2026-01-22T11:00:00',
                },
              ]}
            />
                   <div className="mb-4 flex items-center justify-end">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800">
              <Plus className="h-4 w-4" />
              Novo compromisso
            </Button>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}
