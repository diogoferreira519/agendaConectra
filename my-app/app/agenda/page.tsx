'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Agenda() {
  const router = useRouter();
  const userName = 'Diogo Ferreira'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <header className="flex h-16 items-center justify-between bg-white/90 px-8 shadow backdrop-blur">
        <h1 className="text-lg font-semibold text-black">
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
          <Dialog>
            <form className='flex justify-center'>
              <DialogTrigger className='flex gap-2 border-2 p-1 rounded-md animate-pulse' >
                <Plus className='size-5'></Plus>Adicionar
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

          <div className="flex-1">
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
              eventContent={(info) => {
                const participantes = info.event.extendedProps.participantes || [];
                if (!participantes || participantes.length ===0) return;
                return (
                  <div className="text-sm">
                    <strong>{info.event.title}</strong>

                    {participantes.length > 0 && (
                      <div className="text-xs text-gray-500">
                        Participantes: {participantes.join(', ')}
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
