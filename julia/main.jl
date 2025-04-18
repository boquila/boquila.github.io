struct HTML
    path::String
    description::String
    image::String
    title::String
    lang::String

    function HTML(path::String, description::String, image::String, title::String,lang::String)
        # Validate path
        endswith(path, ".html") || throw(ArgumentError("path must end with .html"))

        # Validate lang
        length(lang) == 2 || throw(ArgumentError("lang must be a 2-character string"))

        # Validate image
        (endswith(image, ".jpg") || endswith(image, ".png")) || 
        throw(ArgumentError("image must end with .jpg or .png"))

        new(path, description, image, title, lang)
    end
end

body(str::String)::String = "<body>\n"*str*"</body>\n"

function text_between(full_string::String, start_string::String, end_string::String)::String
    # Find the start position after the start_string
    start_pos = findnext(start_string, full_string, 1)
    if start_pos === nothing
        return ""  # Start string not found
    end
    
    # Calculate the position after the start_string
    start_idx = start_pos[end] + 1
    
    # Find the end position starting from after the start_string
    end_pos = findnext(end_string, full_string, start_idx)
    if end_pos === nothing
        return ""  # End string not found
    end
    
    return start_string*full_string[start_idx:end_pos[1]-1]*end_string
end

function generate(data::HTML)::String
    footer = read("html/"*data.lang*"/footer.html",String)*"\n"
    head = read("html/"*data.lang*"/head.html",String)*"\n"
    header = read("html/"*data.lang*"/header.html",String)*"\n"
    main = text_between(read(data.path,String),"<main","</main>")*"\n"

    a = """
    <!DOCTYPE html>
    <html lang="$(data.lang)">\n
    """

    final_str = a*head*body(header*main*footer)*"</html>"
    final_str = replace(final_str, "IMAGE_PLACEHOLDER" => data.image)
    final_str = replace(final_str, "TITLE_PLACEHOLDER" => data.title)
    final_str = replace(final_str, "DESCRIPTION_PLACEHOLDER" => data.description)
    return final_str
end

function save(data::HTML)
    str = generate(data)

    open(data.path, "w") do io
        write(io, str);    
    end
end

desc = Dict("es" => "Fundación boquila es una organización dedicada a la investigación aplicada, la conservación de la biodiversidad y el desarrollo sustentable. Utilizamos herramientas basadas en inteligencia artificial como nuestra base. Trabajamos para encontrar soluciones innovadoras que aborden los desafíos ambientales y sociales de nuestra época.", "en" => "Boquila Foundation is a non profit dedicated to applied research, the conservation of biodivesrity and sustainable development. We use artificial intelligence-based tools as our basis. We work to find innovative solutions that address the environmental and social challenges of our time.")
title = Dict("es" => "Fundación Boquila", "en" => "Boquila Foundation")
img = "https://boquila.org/assets/img/logo.png"
b = Dict("es" => ["verso.html","index.html", "donar.html"],"en" => ["verse.html","donate.html","hub.html"])

langs = ["es","en"]

lang = langs[1]
es = [
    HTML("verso.html","BoquilaVerse ofrece una colección abierta y creciente de modelos 3D creados con fotogrametría e inteligencia artificial. Ideal para la educación, el entrenamiento de IA y para conectar con la naturaleza a través de visualizaciones detalladas.",img, "BoquilaVerso",lang)
    HTML("index.html",desc[lang],img, title[lang],lang)
    HTML("donar.html","Apoya a Boquila y sé parte de un movimiento global para proteger el planeta. Tu compromiso puede marcar la diferencia en la conservación de la biodiversidad y el desarrollo sustentable. ¡Dona ahora y únete al cambio!",img, "Apoya a Fundación Boquila",lang)
]

lang = langs[2]
en = [
    HTML("verse.html","BoquilaVerse offers a growing open collection of 3D models made with photogrammetry and deep learning. Ideal for education, AI training, and connecting with nature through detailed visualizations.",img,"BoquilaVerse",lang)
    HTML("donate.html","Support Boquila and become part of a global movement to protect the planet. Your commitment can make a difference in biodiversity conservation and sustainable development. Donate now and join the change!",img,"Support the Boquila Foundation",lang)
    HTML("hub.html","BoquilaHUB empowers conservationists with locally deployed AI—no cloud needed. Enjoy efficient performance, simple UI, and real-time analysis of images and video, even on embedded devices.",img,"BoquilaHUB",lang)
]

save.(es)
save.(en)