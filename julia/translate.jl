using HTTP, JSON3
include("../.env")

function LLM_Request(content, url::String,model::String,API_KEY::String)
    headers = Dict(
        "Content-Type" => "application/json",
        "Authorization" => "Bearer $API_KEY"
    )
    
    data = Dict(
        "model" => model,
        "messages" => [
            Dict(
                "role" => "user",
                "content" => content
            )
        ]
    )
    
    response = HTTP.post(url, headers, JSON3.write(data))
    
    if response.status == 200
        reply = JSON3.read(String(response.body))
        return JSON3.read(reply.choices[1].message.content)
    end
end

llama4(content::String) = LLM_Request(content, "https://api.groq.com/openai/v1/chat/completions", "meta-llama/llama-4-scout-17b-16e-instruct", GROQ_FREE)
