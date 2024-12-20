// Delta Exchange API configuration
const DELTA_API_URL = 'https://api.delta.exchange/v2';
const DELTA_WS_URL = 'wss://socket.delta.exchange';

export interface DeltaCredentials {
  apiKey: string;
  apiSecret: string;
}

export const connectWebSocket = (onMessage: (data: any) => void) => {
  // Using browser's native WebSocket instead of 'ws' package
  const ws = new WebSocket(DELTA_WS_URL);

  ws.onopen = () => {
    console.log('WebSocket Connected');
    // Subscribe to BTC-USDT ticker
    ws.send(JSON.stringify({
      "type": "subscribe",
      "payload": {
        "channels": [
          {
            "name": "v2/ticker",
            "symbols": ["BTC_USDT"]
          }
        ]
      }
    }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return ws;
};

export const modifyOrder = async (orderId: string, price: string, size: string, credentials: DeltaCredentials) => {
  const response = await fetch(`${DELTA_API_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'api-key': credentials.apiKey,
      // In a production environment, signature should be properly generated
    },
    body: JSON.stringify({ price, size })
  });
  return response.json();
};

export const cancelOrder = async (orderId: string, credentials: DeltaCredentials) => {
  const response = await fetch(`${DELTA_API_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'api-key': credentials.apiKey,
    }
  });
  return response.json();
};