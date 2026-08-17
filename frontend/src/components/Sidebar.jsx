import './Sidebar.css';

export default function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) {
  const handleDelete = (event, conv) => {
    // Don't let the click select the conversation on its way out
    event.stopPropagation();

    const title = conv.title || 'New Conversation';
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      onDeleteConversation(conv.id);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>LLM Council</h1>
        <button className="new-conversation-btn" onClick={onNewConversation}>
          + New Conversation
        </button>
      </div>

      <div className="conversation-list">
        {conversations.length === 0 ? (
          <div className="no-conversations">No conversations yet</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${
                conv.id === currentConversationId ? 'active' : ''
              }`}
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="conversation-title">
                {conv.title || 'New Conversation'}
              </div>
              <div className="conversation-meta">
                {conv.message_count} messages
              </div>
              <button
                className="delete-conversation-btn"
                onClick={(event) => handleDelete(event, conv)}
                title="Delete conversation"
                aria-label="Delete conversation"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
