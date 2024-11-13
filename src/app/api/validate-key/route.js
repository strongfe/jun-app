import { NextResponse } from 'next/server';
import { apiKeyService } from '../../../services/apiKeyService';

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const isValid = await apiKeyService.validateApiKey(apiKey);
    
    if (isValid) {
      return NextResponse.json({ valid: true, message: 'API key is valid' });
    } else {
      return NextResponse.json(
        { valid: false, message: 'Invalid API key' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in validate-key route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 