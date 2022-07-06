import { RemixServer } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: any
) {
  let controller = new AbortController();
  let didError = false;

  const stream = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onError(error) {
        didError = true;
        console.error(error);
      },
      signal: controller.signal,
    }
  );

  await stream.allReady;

  responseHeaders.set("Content-Type", "text/html");

  return new Response(stream, {
    status: didError ? 500 : responseStatusCode,
    headers: responseHeaders,
  });
}
