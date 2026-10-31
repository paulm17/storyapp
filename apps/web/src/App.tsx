import { ActionIcon, AppShell, Badge, Button, Paper, Textarea, UnstyledButton } from '@mantine/core';
import type { CSSProperties } from 'react';
import './styles.css';

type IconName = 'file' | 'folder' | 'search' | 'chevron' | 'plus' | 'close' | 'pen' | 'split' | 'eye' | 'history' | 'more' | 'star' | 'sun' | 'attach' | 'globe' | 'arrow' | 'plug' | 'check';
function Icon({ name, size = 12 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    file: <><path d="M5 2h8l4 4v14H5z"/><path d="M13 2v5h4"/></>,
    folder: <path d="M3 6h6l2 2h10v12H3z"/>,
    search: <><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></>,
    chevron: <path d="m8 4 7 8-7 8"/>, plus: <path d="M12 4v16M4 12h16"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>, pen: <><path d="m4 15-1 6 6-1L21 8l-5-5zM13 6l5 5"/></>,
    split: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M12 5v14"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    history: <><path d="M4 5v6h6M4 10a8 8 0 1 1 1 8M12 7v5l3 2"/></>,
    more: <><circle cx="4" cy="12" r=".7"/><circle cx="12" cy="12" r=".7"/><circle cx="20" cy="12" r=".7"/></>,
    star: <path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>,
    sun: <><circle cx="12" cy="12" r="3"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>,
    attach: <path d="m9 14 7-7a3 3 0 0 1 4 4L10 21a5 5 0 0 1-7-7L14 3m-8 14L17 6"/>,
    globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
    arrow: <path d="M12 20V4m-6 6 6-6 6 6"/>, plug: <><path d="M8 2v5m8-5v5M6 7h12v5a6 6 0 0 1-12 0zM12 18v4"/></>,
    check: <path d="m5 12 4 4L20 5"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
function Tool({ icon, label }: { icon: IconName; label: string }) { return <ActionIcon variant="subtle" color="gray" size={23} aria-label={label}><Icon name={icon}/></ActionIcon>; }
function AgentMark() { return <span className="agent-mark">✣</span>; }
const treeRows: { text: string; depth: number; folder?: boolean; expanded?: boolean; selected?: boolean; star?: boolean }[] = [
  {text:'Manuscript',depth:0,folder:true,expanded:true},
  {text:'Chapter 1 — The Map Room',depth:1,expanded:true,selected:true,star:true},
  {text:'§1. Opening scene',depth:2}, {text:'§2. The marginalia',depth:2},
  {text:'Chapter 2 — Borders',depth:1}, {text:'Chapter 3 — The Compass',depth:1},
  {text:'Characters',depth:0,folder:true,expanded:true}, {text:'Iren Vell',depth:1,expanded:true},
  {text:'Backstory',depth:2}, {text:'Voice notes',depth:2}, {text:'Aldous Vell',depth:1},
  {text:'World',depth:0,folder:true}, {text:'Planning',depth:0,folder:true},
];
function Sidebar() { return <>
  <div className="traffic"><i/><i/><i/></div>
  <UnstyledButton className="workspace"><span className="workspace-mark">C</span><span><small>Workspace</small><strong>The Cartographer</strong></span><span className="workspace-chevron"><Icon name="chevron" size={10}/></span></UnstyledButton>
  <UnstyledButton className="side-action"><Icon name="plus"/> <strong>New chat</strong></UnstyledButton>
  <UnstyledButton className="side-action search"><Icon name="search"/> Search <span>⌘K</span></UnstyledButton>
  <div className="sidebar-empty"/>
  <div className="sidebar-tabs"><Button variant="white" size="compact-xs">Documents <span>13</span></Button><Button variant="subtle" color="gray" size="compact-xs">Chats <span>6</span></Button></div>
  <div className="files-label">FILES <Icon name="plus" size={10}/></div>
  <nav aria-label="Documents" className="file-tree">{treeRows.map(row => <UnstyledButton key={row.text} className={`tree-row ${row.selected?'selected':''}`} style={{'--depth': row.depth} as CSSProperties}>
    <span className={`tree-chevron ${row.expanded?'expanded':''}`}>{row.folder || row.expanded ? <Icon name="chevron" size={8}/> : null}</span><Icon name={row.folder?'folder':'file'} size={10}/><span className="tree-name">{row.text}</span>{row.star && <Icon name="star" size={9}/>}
  </UnstyledButton>)}</nav>
  <div className="account-footer"><span className="avatar">B</span><span>Baoyu</span><span className="theme-icon"><Icon name="sun" size={12}/></span></div>
  </>; }
function Manuscript() { return <>
  <header className="editor-toolbar"><div className="breadcrumbs"><span>The Cartographer</span><Icon name="chevron" size={8}/><span>Manuscript</span><Icon name="chevron" size={8}/><strong>Chapter 1 — The Map Room</strong></div><div className="editor-modes"><Button variant="white" size="compact-xs" leftSection={<Icon name="pen" size={10}/>}>Write</Button><Button variant="subtle" color="gray" size="compact-xs" leftSection={<Icon name="split" size={10}/>}>Split</Button><Button variant="subtle" color="gray" size="compact-xs" leftSection={<Icon name="eye" size={10}/>}>Preview</Button></div><Tool icon="history" label="History"/><Tool icon="more" label="More options"/></header>
  <div className="manuscript-scroll"><article className="manuscript"><h1>Chapter 1 — The Map Room</h1>
    <p className="selected-paragraph">The map room had not been opened in eleven years, and Iren felt the weight of that disuse the moment she pushed against the door. It gave with a sigh, releasing a breath of lavender and dry paper into the hall.</p>
    <p>Inside, the maps lay where her grandfather had left them — pinned, folded, layered three deep on the great oak table. Sunlight fell in narrow bars through the shuttered window and lit them piece by piece, the way a librarian might read.</p>
    <p>She crossed to the table and stood looking down. Verisand was the first map. She knew it by the trembling line of its eastern coast, by the small notation beside the harbor that read, in her grandfather's careful hand, <em>here the wind turns.</em></p>
    <blockquote>A map is a promise about a place. Whether the place keeps it is another matter.<br/>— Aldous Vell, Notes on the Edge</blockquote>
    <p>Iren sat down. The chair complained. She unrolled the second map — the inland survey, the one no one but the family had ever seen — and let it settle into the shape it remembered.</p>
    <h2>The marginalia</h2>
  </article></div>
  <footer className="editor-status"><span>3,214 words</span><span>· ~14 min</span><span>· Markdown</span><span className="save-status">Saved 2 min ago</span></footer>
  </>; }
function AgentPanel() { return <>
  <header className="agent-header"><AgentMark/><div><strong>Writing agent</strong><small>scoped to Chapter 1 — The Map Room</small></div><Tool icon="close" label="Close agent"/></header>
  <div className="suggestions"><Button variant="white" size="compact-xs">Suggest a rewrite</Button><Button variant="white" size="compact-xs">Show in document</Button></div>
  <div className="conversation-scroll"><div className="conversation">
    <div className="user-message">Suggest a rewrite of the opening paragraph.</div>
    <div className="agent-message"><AgentMark/><div className="agent-message-content"><p>Here's a version that lets the door image breathe before we get inside Iren's head:</p>
      <Paper className="rewrite-card" radius="sm"><div className="rewrite-label"><Icon name="file" size={9}/><strong>Chapter 1 · ¶1</strong><span>47 → 52 words</span></div><div className="rewrite-body"><div className="diff removed">The map room had not been opened in eleven years, and Iren felt the weight of that disuse the moment she pushed against the door.</div><div className="diff added">The map room had not been opened in eleven years. The door gave with a sigh when Iren pushed against it, releasing a breath of lavender and dry paper into the hall — and with it, the weight of all that disuse.</div></div><div className="rewrite-actions"><Button variant="white" size="compact-xs" leftSection={<Icon name="close" size={9}/>}>Reject</Button><Button color="dark" size="compact-xs" leftSection={<Icon name="check" size={9}/>}>Accept</Button></div></Paper>
    </div></div>
    <div className="user-message synopsis-command">/new a one-page synopsis of Iren</div>
    <div className="agent-message synopsis-message"><AgentMark/><div className="agent-message-content"><p>Drafted. Saved to <strong>Characters / Iren / Synopsis.md.</strong></p><Paper className="synopsis-card" radius="sm" withBorder><div className="synopsis-title"><Icon name="file" size={11}/><strong>Iren — Synopsis.md</strong><Badge variant="light" color="orange" size="xs">New</Badge></div><div className="synopsis-path">Characters / Iren</div><p>Iren Vell, 27. Granddaughter of the cartographer Aldous Vell, returns to the fami...</p><small>412 words · click to open →</small></Paper></div></div>
  </div></div>
  <Paper className="composer" radius="md" withBorder><Textarea aria-label="Ask the agent" placeholder="Ask the agent, / for commands..." variant="unstyled" autosize minRows={2} readOnly/><div className="composer-footer"><span className="scope-chip"><Icon name="file" size={9}/>Chapter 1 — The Map Room <Icon name="close" size={8}/></span><span className="plugins-chip"><Icon name="plug" size={9}/>Plugins</span><span className="composer-tools"><Tool icon="attach" label="Attach file"/><Tool icon="globe" label="Web"/><ActionIcon variant="light" color="gray" size={22} aria-label="Send message"><Icon name="arrow" size={13}/></ActionIcon></span></div></Paper>
  </>; }
export default function App() { return <AppShell className="writing-app" navbar={{width:210,breakpoint:0}} aside={{width:320,breakpoint:0}} padding={0}>
  <AppShell.Navbar className="sidebar"><Sidebar/></AppShell.Navbar>
  <AppShell.Main className="editor"><Manuscript/></AppShell.Main>
  <AppShell.Aside className="agent-panel"><AgentPanel/></AppShell.Aside>
</AppShell>; }
