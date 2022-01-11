enum StatusCode {
  Gemeld = 'm',
  Afwachting = 'i',
  Behandeling = 'b',
  Afgehandeld = 'o',
  Ingepland = 'ingepland',
  Geannuleerd = 'a',
  Gesplitst = 's',
  VerzoekTotHeropenen = 'reopen requested',
  ReactieGevraagd = 'reaction requested',
  ReactieOntvangen = 'reaction received',
  Heropend = 'reopened',
  TeVerzenden = 'ready to send',
  Verzonden = 'sent',
  VerzendenMislukt = 'send failed',
  VerzoekTotAfhandeling = 'closure requested',
  AfgehandeldExtern = 'done external',
}

export default StatusCode
