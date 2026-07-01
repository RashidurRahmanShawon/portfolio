import React from "react";

const C = {
  bg: "#313338", sidebar: "#2b2d31", rail: "#1e1f22",
  input: "#383a40", active: "#404249",
  muted: "#949ba4", white: "#dbdee1", dim: "#80848e",
};

const SERVERS = [
  { id: "NV", name: "Nova Community",  abbr: "NC", color: "#f59e0b", bg: "#78350f" },
  { id: "AH", name: "Automation Hub",  abbr: "AH", color: "#60a5fa", bg: "#1e3a5f" },
  { id: "ZN", name: "Zenith Network",  abbr: "ZN", color: "#34d399", bg: "#064e3b" },
  { id: "DF", name: "Developer Forge", abbr: "DF", color: "#a78bfa", bg: "#2e1065" },
  { id: "OL", name: "Operations Lab",  abbr: "OL", color: "#fb7185", bg: "#4c0519" },
  { id: "AS", name: "Apex Systems",    abbr: "AS", color: "#818cf8", bg: "#1e1b4b" },
];

function ServerLogo({ id, color, bg, size = 32 }) {
  const icons = {
    NV: <polygon points="16,6 22,14 28,10 22,26 10,26 4,10 10,14" fill={color} opacity="0.9"/>,
    AH: <><rect x="7" y="13" width="18" height="6" rx="3" fill={color} opacity="0.9"/><circle cx="12" cy="16" r="2.5" fill={bg}/><circle cx="20" cy="16" r="2.5" fill={bg}/><path d="M16 8 L16 13 M16 19 L16 24" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    ZN: <><polyline points="6,22 12,10 18,18 24,10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="24" cy="10" r="2.5" fill={color}/></>,
    DF: <><path d="M10 20 L16 8 L22 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><line x1="11.5" y1="16" x2="20.5" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    OL: <><circle cx="16" cy="16" r="7" stroke={color} strokeWidth="2.5" fill="none"/><circle cx="16" cy="16" r="3" fill={color}/><line x1="16" y1="5" x2="16" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="23" x2="16" y2="27" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="16" x2="9" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="23" y1="16" x2="27" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    AS: <polygon points="16,7 19,13 26,14 21,19 22.5,26 16,23 9.5,26 11,19 6,14 13,13" fill={color} opacity="0.85"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: "block", borderRadius: "50%", flexShrink: 0 }}>
      <circle cx="16" cy="16" r="16" fill={bg}/>
      {icons[id]}
    </svg>
  );
}

const CATEGORIES = [
  { name: "ENTRANTS", channels: [
    { id: "welcome", name: "welcome", icon: "👋" },
    { id: "rules", name: "rules", icon: "📋" },
    { id: "announcements", name: "announcements", icon: "📢", unread: 2 },
    { id: "verification", name: "verification", icon: "✅" },
  ]},
  { name: "COMMUNITY", channels: [
    { id: "general", name: "general" },
    { id: "build-zone", name: "build-zone", icon: "🏗️" },
    { id: "skill-trade", name: "skill-trade", icon: "🔄" },
    { id: "showcase", name: "showcase", icon: "🎯" },
  ]},
  { name: "SUPPORT", channels: [
    { id: "support", name: "support", icon: "🎟️" },
    { id: "tickets", name: "tickets", icon: "📩" },
    { id: "bot-commands", name: "bot-commands", icon: "🤖" },
    { id: "logs", name: "logs", icon: "📜" },
  ]},
  { name: "VOICE", channels: [
    { id: "vc-general",  name: "General VC",    type: "voice" },
    { id: "vc-meeting1", name: "Meeting Room 1", type: "voice" },
    { id: "vc-meeting2", name: "Meeting Room 2", type: "voice" },
    { id: "vc-staff",    name: "Staff VC",       type: "voice" },
  ]},
  { name: "STAFF", channels: [
    { id: "staff",      name: "staff-chat", icon: "🔒" },
    { id: "staff-logs", name: "staff-logs", icon: "🔒" },
  ]},
];

const DM_CONTACTS = [
  { id: "dev",     name: "Developer",       status: "online",  color: "#f59e0b" },
  { id: "sarah",   name: "Moderator Sarah", status: "idle",    color: "#60a5fa" },
  { id: "client",  name: "Client Alpha",    status: "online",  color: "#34d399" },
  { id: "zack",    name: "Zack99",          status: "dnd",     color: "#a78bfa" },
  { id: "alexdev", name: "AlexDev",         status: "offline", color: "#80848e" },
];

const MEMBER_GROUPS = [
  { role: "Owner",            color: "#f59e0b", members: [{ name: "Nova Founder", status: "online" }] },
  { role: "Moderator",        color: "#60a5fa", members: [
    { name: "Moderator Sarah", status: "idle" },
    { name: "AlphaTester",     status: "online" },
  ]},
  { role: "Community Member", color: "#949ba4", members: [
    { name: "Zack99",        status: "online"  }, { name: "CloudArch",     status: "online"  },
    { name: "Grace",         status: "online"  }, { name: "Daniel",        status: "offline" },
    { name: "Chloe",         status: "online"  }, { name: "James",         status: "idle"    },
    { name: "EscrowSigner",  status: "online"  }, { name: "CardTrader",    status: "online"  },
    { name: "Liam",          status: "online"  }, { name: "Sophia",        status: "dnd"     },
    { name: "DevopsGuy",     status: "online"  }, { name: "WebsocketGuru", status: "idle"    },
    { name: "Victoria",      status: "offline" }, { name: "Noah",          status: "online"  },
  ]},
];

const statusDot = (s) =>
  s === "online" ? "#23a55a" : s === "idle" ? "#f0b232" : s === "dnd" ? "#f23f43" : "#80848e";

function Avatar({ name, color = "#5865f2", size = 32 }) {
  const initials = name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{ width: size, height: size, minWidth: size, background: color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, color: "#fff", fontWeight: "bold", flexShrink: 0, userSelect: "none" }}>
      {initials}
    </div>
  );
}

function Message({ msg, prev, srv }) {
  const [reactions, setReactions] = React.useState(msg.reactions || []);
  const grouped = prev && prev.author === msg.author && !msg.isSystem;

  if (msg.isSystem) return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 16px", color: C.dim }}>
      <div style={{ flex: 1, height: 1, background: "#3f4147" }}/>
      <span style={{ fontSize: 11 }}>{msg.content}</span>
      <div style={{ flex: 1, height: 1, background: "#3f4147" }}/>
    </div>
  );

  const authorColor = msg.isBot ? "#5865f2" : (msg.roleColor || C.white);
  const toggle = (emoji) => setReactions(r => r.map(x => x.emoji === emoji ? { ...x, count: x.mine ? x.count-1 : x.count+1, mine: !x.mine } : x));

  return (
    <div style={{ display: "flex", gap: 12, padding: "2px 16px", marginTop: grouped ? 0 : 16, borderRadius: 4 }}
      onMouseEnter={e => e.currentTarget.style.background="rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
      <div style={{ width: 40, minWidth: 40, flexShrink: 0 }}>
        {!grouped && (
          msg.isBot
            ? <ServerLogo id={srv.id} color={srv.color} bg={srv.bg} size={40}/>
            : <Avatar name={msg.author} color={authorColor === C.white ? "#5865f2" : authorColor} size={40}/>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {!grouped && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
            <span style={{ color: authorColor, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>{msg.author}</span>
            {msg.isBot && <span style={{ background: "#5865f2", color: "#fff", fontSize: 10, padding: "1px 4px", borderRadius: 3, fontWeight: "bold" }}>APP</span>}
            <span style={{ color: C.dim, fontSize: 11 }}>{msg.time}</span>
          </div>
        )}
        {msg.embed ? (
          <div style={{ borderLeft: `4px solid ${msg.embed.color||"#5865f2"}`, background: "#2b2d31", borderRadius: "0 4px 4px 0", padding: "8px 12px", marginTop: 4 }}>
            {msg.embed.title && <p style={{ color: C.white, fontWeight: "bold", marginBottom: 4, fontSize: 14 }}>{msg.embed.title}</p>}
            <p style={{ color: C.muted, fontSize: 13, whiteSpace: "pre-wrap" }}>{msg.embed.desc}</p>
          </div>
        ) : (
          <p style={{ color: C.white, fontSize: 14, lineHeight: 1.5, wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{msg.content}</p>
        )}
        {reactions.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            {reactions.map(r => (
              <button key={r.emoji} onClick={() => toggle(r.emoji)}
                style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, fontSize: 12, background: r.mine ? "rgba(88,101,242,0.3)" : "#2b2d31", border: `1px solid ${r.mine ? "#5865f2" : "#3f4147"}`, color: r.mine ? "#8fa8ff" : C.muted, cursor: "pointer" }}>
                <span>{r.emoji}</span><span>{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiscordApp({ discordMessages, sendDiscordMessage, botConfigs, activeServer, setActiveServer, activeChannel, setActiveChannel }) {
  const [chatInput, setChatInput] = React.useState("");
  const [collapsed, setCollapsed] = React.useState({});
  const [isDM, setIsDM] = React.useState(false);
  const [activeDM, setActiveDM] = React.useState("dev");
  const [showMembers, setShowMembers] = React.useState(true);
  const endRef = React.useRef(null);

  React.useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); },
    [discordMessages, activeServer, activeChannel, isDM, activeDM]);

  const srv = SERVERS.find(s => s.id === activeServer) || SERVERS[0];
  const msgs = isDM ? (discordMessages?.DM?.[activeDM] || []) : (discordMessages?.[activeServer]?.[activeChannel] || []);
  const dmContact = DM_CONTACTS.find(d => d.id === activeDM);
  const chanDisplay = isDM ? `@${dmContact?.name || activeDM}` : `#${activeChannel}`;
  const bot = botConfigs?.[activeServer];

  const allGroups = [
    ...(bot ? [{ role: "Bot", color: "#5865f2", members: [{ name: bot.name, status: "online", isBot: true }] }] : []),
    ...MEMBER_GROUPS,
  ];

  const getChanIcon = () => {
    for (const cat of CATEGORIES) {
      const ch = cat.channels.find(c => c.id === activeChannel);
      if (ch) return ch.icon || "#";
    }
    return "#";
  };

  const handleSend = (e) => {
    e.preventDefault();
    const content = chatInput.trim();
    if (!content) return;
    setChatInput("");
    if (isDM) { sendDiscordMessage("DM", activeDM, "You", content); return; }
    sendDiscordMessage(activeServer, activeChannel, "You", content);
    setTimeout(() => {
      const botName = bot?.name || "System Bot";
      if (content === "!status") {
        sendDiscordMessage(activeServer, activeChannel, botName, null, true, { title: `${botName} Status`, desc: `Online\nVerification: ${bot?.verification ? "ENABLED" : "DISABLED"}\nTickets: ${bot?.tickets ? "ENABLED" : "DISABLED"}\nModeration: ${bot?.moderation ? "ENABLED" : "DISABLED"}`, color: "#23a55a" });
      } else if (content === "!help") {
        sendDiscordMessage(activeServer, activeChannel, botName, "Commands:\n!status - Bot status\n!help - Show this\n!members - Count", true);
      } else if (content === "!members") {
        sendDiscordMessage(activeServer, activeChannel, botName, `${srv.name} has 107 members. 89 online.`, true);
      } else if (content.startsWith("!")) {
        sendDiscordMessage(activeServer, activeChannel, botName, `Unknown command: ${content}. Try !help`, true);
      }
    }, 500);
  };

  const scrollStyle = {
    scrollbarColor: "#3f4147 transparent",
    ["scrollbarWidth" + ""]: "thin"
  };
  const sidebarStyle = { background: C.sidebar };




  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", overflow: "hidden", background: C.bg, fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 14 }}>

      {/* Server Rail */}
      <div style={{ width: 72, minWidth: 72, background: C.rail, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, paddingBottom: 12, gap: 8, overflowY: "auto", ...scrollStyle }}>
        <button onClick={() => setIsDM(true)} title="Direct Messages"
          style={{ width: 48, height: 48, borderRadius: isDM ? 16 : 24, background: isDM ? "#5865f2" : "#313338", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-radius 0.15s", flexShrink: 0, position: "relative" }}>
          {!isDM && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 4, height: 20, background: C.white, borderRadius: "0 2px 2px 0" }}/>}
          <svg viewBox="0 0 24 24" width="22" height="22" fill={isDM ? "#fff" : C.muted}><path d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.44.8-.57 1.11a16.83 16.83 0 0 0-5.12 0c-.13-.32-.37-.7-.57-1.11a18.2 18.2 0 0 0-4.6 1.44C1.63 9.63.8 14.26 1.2 18.83a18.48 18.48 0 0 0 5.65 2.89c.46-.63.87-1.3 1.21-2a11.97 11.97 0 0 1-1.9-.92c.16-.12.32-.24.47-.37a13.15 13.15 0 0 0 11.3 0c.15.13.3.25.47.37-.61.36-1.25.67-1.9.92.34.7.75 1.37 1.21 2a18.38 18.38 0 0 0 5.65-2.89c.46-5.01-.78-9.61-3.33-13.96z"/></svg>
        </button>
        <div style={{ width: 32, height: 1, background: "#3f4147", flexShrink: 0 }}/>
        {SERVERS.map(s => {
          const active = !isDM && activeServer === s.id;
          return (
            <button key={s.id} onClick={() => { setIsDM(false); setActiveServer(s.id); setActiveChannel("welcome"); }}
              title={s.name}
              style={{ width: 48, height: 48, border: "none", cursor: "pointer", borderRadius: active ? 16 : 24, overflow: "hidden", padding: 0, flexShrink: 0, position: "relative", transition: "border-radius 0.15s" }}>
              {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 4, height: 32, background: C.white, borderRadius: "0 2px 2px 0", zIndex: 1 }}/>}
              <ServerLogo id={s.id} color={s.color} bg={s.bg} size={48}/>
            </button>
          );
        })}
      </div>

      {/* Channel Sidebar */}
      <div style={{ width: 220, minWidth: 220, ...sidebarStyle, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: 48, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e1f22", cursor: "pointer", flexShrink: 0, color: C.white, fontWeight: "bold", fontSize: 15 }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{isDM ? "Direct Messages" : srv.name}</span>
          <span style={{ color: C.muted, fontSize: 18, flexShrink: 0 }}>⌄</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px", minHeight: 0, ...scrollStyle }}>
          {isDM ? (
            <>
              <p style={{ padding: "4px 8px", color: C.dim, fontSize: 11, fontWeight: "bold", textTransform: "uppercase", marginBottom: 4 }}>Direct Messages</p>
              {DM_CONTACTS.map(dm => (
                <button key={dm.id} onClick={() => setActiveDM(dm.id)}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 8px", borderRadius: 4, border: "none", cursor: "pointer", background: activeDM === dm.id ? C.active : "transparent", marginBottom: 2 }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <Avatar name={dm.name} color={dm.color} size={32}/>
                    <div style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: statusDot(dm.status), border: `2px solid ${C.sidebar}` }}/>
                  </div>
                  <div style={{ textAlign: "left", minWidth: 0 }}>
                    <p style={{ color: activeDM === dm.id ? C.white : C.muted, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dm.name}</p>
                    <p style={{ color: C.dim, fontSize: 11 }}>{dm.status}</p>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <>
              {["📅 Events","🔍 Browse Channels","👥 Members","⭐ Boosts"].map(label => (
                <button key={label} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 8px", borderRadius: 4, border: "none", cursor: "pointer", background: "transparent", color: C.muted, fontSize: 13 }}>{label}</button>
              ))}
              <div style={{ height: 1, background: "#3f4147", margin: "8px 0" }}/>
              {CATEGORIES.map(cat => (
                <div key={cat.name} style={{ marginBottom: 4 }}>
                  <button onClick={() => setCollapsed(p => ({ ...p, [cat.name]: !p[cat.name] }))}
                    style={{ display: "flex", alignItems: "center", gap: 4, width: "100%", padding: "2px 4px", borderRadius: 4, border: "none", cursor: "pointer", background: "transparent" }}>
                    <span style={{ color: C.dim, fontSize: 10, display: "inline-block", transform: collapsed[cat.name] ? "rotate(-90deg)" : "rotate(0)", transition: "transform 0.15s" }}>▼</span>
                    <span style={{ color: C.dim, fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}>{cat.name}</span>
                  </button>
                  {!collapsed[cat.name] && cat.channels.map(ch => {
                    if (ch.type === "voice") return (
                      <button key={ch.id} style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "4px 8px", borderRadius: 4, border: "none", cursor: "pointer", background: "transparent", color: C.dim, fontSize: 13 }}>
                        <span style={{ fontSize: 13 }}>🔊</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.name}</span>
                      </button>
                    );
                    const isActive = ch.id === activeChannel && !isDM;
                    return (
                      <button key={ch.id} onClick={() => { setIsDM(false); setActiveChannel(ch.id); }}
                        style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "4px 8px", borderRadius: 4, border: "none", cursor: "pointer", background: isActive ? C.active : "transparent", color: isActive ? C.white : C.muted, fontSize: 13 }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>{ch.icon || "#"}</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500, flex: 1, textAlign: "left" }}>{ch.name}</span>
                        {ch.unread && !isActive && <span style={{ background: "#f23f43", color: "#fff", fontSize: 10, padding: "1px 5px", borderRadius: 8, fontWeight: "bold", flexShrink: 0 }}>{ch.unread}</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </>
          )}
        </div>
        {/* User bar */}
        <div style={{ padding: "8px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, background: "#232428" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <Avatar name="You" color="#f59e0b" size={32}/>
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: "#23a55a", border: "2px solid #232428" }}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: C.white, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>You</p>
            <p style={{ color: C.dim, fontSize: 11 }}>#visitor</p>
          </div>
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {["🎙","🔇","⚙️"].map(i => <button key={i} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, opacity: 0.8 }}>{i}</button>)}
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ height: 48, padding: "0 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1e1f22", background: C.bg, flexShrink: 0 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{isDM ? "💬" : getChanIcon()}</span>
          <span style={{ color: C.white, fontWeight: "bold", fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{chanDisplay}</span>
          {!isDM && bot && <span style={{ color: C.dim, fontSize: 12, flexShrink: 0 }}>| Bot: {bot.name}</span>}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setShowMembers(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: showMembers ? C.white : C.dim }}>👥</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", borderRadius: 4, background: C.input }}>
              <input placeholder="Search..." style={{ background: "none", border: "none", outline: "none", color: C.white, fontSize: 13, width: 80 }}/>
              <span style={{ color: C.dim }}>🔍</span>
            </div>
          </div>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0, ...scrollStyle }}>
          {activeChannel === "welcome" && !isDM && (
            <div style={{ padding: "32px 24px 16px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", marginBottom: 16 }}><ServerLogo id={srv.id} color={srv.color} bg={srv.bg} size={64}/></div>
              <h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Welcome to {srv.name}</h1>
              <p style={{ color: C.muted, fontSize: 14 }}>This is the beginning of the <strong style={{ color: C.white }}>#{activeChannel}</strong> channel.</p>
              <p style={{ color: C.dim, fontSize: 12, marginTop: 8 }}>Type <code style={{ background: "#2b2d31", padding: "1px 5px", borderRadius: 3 }}>!help</code> for bot commands.</p>
            </div>
          )}
          {msgs.map((msg, idx) => <Message key={idx} msg={msg} prev={idx > 0 ? msgs[idx-1] : null} srv={srv}/>)}
          <div ref={endRef} style={{ height: 16 }}/>
        </div>
        {/* Input */}
        <div style={{ padding: "8px 16px 12px", flexShrink: 0 }}>
          <form onSubmit={handleSend} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 8, background: C.input }}>
            <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, flexShrink: 0 }}>➕</button>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={`Message ${chanDisplay}`}
              style={{ flex: 1, minWidth: 0, background: "none", border: "none", outline: "none", color: C.white, fontSize: 14 }}/>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              {["🎁","🖼️","😀"].map(icon => <button key={icon} type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>{icon}</button>)}
            </div>
          </form>
          <p style={{ color: C.dim, fontSize: 11, marginTop: 4, paddingLeft: 4 }}>
            Commands: <code>!help</code> · <code>!status</code> · <code>!members</code>
          </p>
        </div>
      </div>

      {/* Member List */}
      {showMembers && !isDM && (
        <div style={{ width: 240, minWidth: 180, ...sidebarStyle, overflowY: "auto", flexShrink: 0, ...scrollStyle }}>
          <div style={{ padding: "16px 12px 8px" }}>
            {allGroups.map(group => (
              <div key={group.role} style={{ marginBottom: 12 }}>
                <p style={{ color: C.dim, fontSize: 11, fontWeight: "bold", textTransform: "uppercase", padding: "0 8px", marginBottom: 4 }}>
                  {group.role} — {group.members.length}
                </p>
                {group.members.map((mem, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 4, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      {mem.isBot
                        ? <ServerLogo id={srv.id} color={srv.color} bg={srv.bg} size={32}/>
                        : <Avatar name={mem.name} color={group.color} size={32}/>
                      }
                      <div style={{ position: "absolute", bottom: -2, right: -2, width: 10, height: 10, borderRadius: "50%", background: statusDot(mem.status), border: `2px solid ${C.sidebar}` }}/>
                    </div>
                    <p style={{ color: mem.status === "offline" ? C.dim : C.white, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                      {mem.name}
                      {mem.isBot && <span style={{ marginLeft: 4, background: "#5865f2", color: "#fff", fontSize: 9, padding: "1px 4px", borderRadius: 3 }}>APP</span>}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
