import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const audioBuffer = req.body.audio;
   
    console.log("Audio buffer received:", audioBuffer);

    try {
      const response = await fetch('https://api.deepgram.com/v1/listen', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/webm',
        },
        body: audioBuffer,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transcribe audio.');
      }

      res.status(200).json({ transcription: data.results.channels[0].alternatives[0].transcript });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
