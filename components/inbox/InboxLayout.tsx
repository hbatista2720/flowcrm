'use client'

import { useState } from 'react'
import ConversationList from './ConversationList'
import ChatWindow from './ChatWindow'

interface Message {
  id: string
  text: string
  timestamp: string
  isFromUser: boolean
}

interface Conversation {
  id: string
  contactName: string
  phone: string
  email?: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  status: 'active' | 'pending' | 'resolved'
  source: 'whatsapp' | 'email' | 'web'
  messages: Message[]
}

export default function InboxLayout() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  return (
    <div className="h-full flex">
      <ConversationList
        onSelectConversation={setSelectedConversation}
        selectedConversationId={selectedConversation?.id}
      />
      <ChatWindow conversation={selectedConversation} />
    </div>
  )
}