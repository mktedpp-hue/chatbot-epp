export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message,
        system: `
Eres el asistente oficial de la Escuela Peruana de Parrilleros.
Responde dudas sobre cursos, parrilla, módulos, certificación, prácticas y temas relacionados.
Habla de forma amable, clara y profesional.
        `
      })
    });

    const data = await response.json();

    res.status(200).json({ reply: data.output_text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno en el chatbot" });
  }
}

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno en el chatbot" });
  }
}
