
export const OrderStyles = () => (
  <style>
    {`
    .orders-panel {
      @apply flex-1 transition-all duration-200;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
    }
    .order-card {
      @apply bg-card/30 hover:bg-card/40 backdrop-blur-sm;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .order-info-card,
    .address-card {
      @apply backdrop-blur-sm;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .weekly-schedule-card {
      @apply backdrop-blur-sm;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .opened-chats-footer {
      background: transparent !important;
      box-shadow: none !important;
    }
    :global(.dark) .orders-panel {
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
    }
    :global(.dark) .order-card {
      @apply bg-gray-900/30 hover:bg-gray-900/40;
    }
    :global(.dark) .order-info-card,
    :global(.dark) .address-card {
      background: rgba(0, 0, 0, 0.2);
    }
    :global(.dark) .weekly-schedule-card {
      background: rgba(0, 0, 0, 0.2);
    }
    :global(.dark) .opened-chats-footer {
      background: transparent !important;
      border-color: rgba(255,255,255,0.1);
      box-shadow: none !important;
    }
    `}
  </style>
);
