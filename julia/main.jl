const DictDef = Dict{Union{Symbol,String},Union{String,Function}}
langs::Vector{String} = ["es", "en", "zh", "fr", "de", "jp", "it", "dk"]

function get_data(dict::DictDef, lang::String)::String
    return haskey(dict, lang) ? dict[lang] : dict[:default](lang)
end

Base.@kwdef struct Page
    title::DictDef
    desc::DictDef
    links::DictDef
    img::DictDef
end

struct HTML
    path::String
    description::String
    image::String
    title::String
    lang::String

    function HTML(path::String, lang::String, page::Page)
        # Validate path
        endswith(path, ".html") || throw(ArgumentError("path must end with .html"))

        # Validate lang
        length(lang) == 2 || throw(ArgumentError("lang must be a 2-character string"))

        image = get_data(page.img, lang)

        # Validate image
        (endswith(image, ".jpg") || endswith(image, ".png")) ||
            throw(ArgumentError("image must end with .jpg or .png"))

        description = get_data(page.desc, lang)
        title = get_data(page.title, lang)

        new(path, description, image, title, lang)
    end
end

body(str::String)::String = "<body>\n" * str * "</body>\n"

function get_layer(data::HTML)::Int
    count(c -> c == '/', data.path)
end

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

    return start_string * full_string[start_idx:end_pos[1]-1] * end_string
end

get_main(str::String)::String = text_between(str, "<main", "</main>") * "\n"

function generate(data::HTML)::String
    footer = read("html/footer.html", String) * "\n"
    head = read("html/head.html", String) * "\n"
    header = read("html/header.html", String) * "\n"
    main = read(data.path, String) |> get_main

    a = """
    <!DOCTYPE html>
    <html lang="$(data.lang)">\n
    """

    final_str = a * head * body(header * main * footer) * "</html>"
    final_str = replace(final_str,
        "IMAGE_PLACEHOLDER" => data.image,
        "TITLE_PLACEHOLDER" => data.title,
        "DESCRIPTION_PLACEHOLDER" => data.description,
        "FOOTER_PLACEHOLDER" => get_data(footer_text, data.lang),
        "KEYWORDS_PLACEHOLDER" => get_data(keywords, data.lang),
        "DONATE_BUTTON_TEXT" => get_data(donate_button_text, data.lang),
        # header
        "MAIN_LINK" => get_data(default.links, data.lang),
        "HUB_LINK" => get_data(hub.links, data.lang),
        "VERSE_LINK" => get_data(verse.links, data.lang),
        "DONATE_LINK" => get_data(donate.links, data.lang),
        "BLOG_LINK" => "https://boquila.org/$(data.lang)/blog",
        "CURRENT_LANG" => uppercase(data.lang)
    )

    layer::Int = get_layer(data)
    if layer > 0
        prefix = "../"^layer
        final_str = replace(final_str, "href=\"assets" => "href=\"" * prefix * "assets")
        final_str = replace(final_str, "href=\"js" => "href=\"" * prefix * "js")
        final_str = replace(final_str, "href=\"css" => "href=\"" * prefix * "css")
        final_str = replace(final_str, "src=\"assets" => "src=\"" * prefix * "assets")
        final_str = replace(final_str, "src=\"js" => "src=\"" * prefix * "js")
        final_str = replace(final_str, "src=\"css" => "src=\"" * prefix * "css")
    end

    return final_str
end

function get_basic(lang)::Vector{HTML}
    return [
        HTML(lang * "/index.html", lang, default)
        HTML(lang * "/verse.html", lang, verse) # boquilaverse
        HTML(lang * "/donate.html", lang, donate) # donate
        HTML(lang * "/hub.html", lang, hub) # boquilahub
    ]
end

function save(data::HTML)
    str = generate(data)

    open(data.path, "w") do io
        write(io, str)
    end
end

process(str::String) = save.(get_basic(str))

verse = Page(
    title=Dict(
        "es" => "BoquilaVerso",
        :default => lang -> "BoquilaVerse"
    ),
    desc=Dict(
        "es" => "BoquilaVerso ofrece una colección abierta y creciente de modelos 3D creados con fotogrametría e inteligencia artificial. Ideal para la educación, el entrenamiento de IA y para conectar con la naturaleza a través de visualizaciones detalladas.",
        "en" => "BoquilaVerse offers a growing open collection of 3D models made with photogrammetry and deep learning. Ideal for education, AI training, and connecting with nature through detailed visualizations.",
        "fr" => "BoquilaVerse propose une collection ouverte et croissante de modèles 3D créés avec la photogrammétrie et l'intelligence artificielle. Idéal pour l'éducation, la formation en IA et pour se connecter avec la nature grâce à des visualisations détaillées.",
        "zh" => "BoquilaVerse提供不断扩大的开放式3D模型库，所有模型均通过摄影测量和深度学习技术构建。特别适合教育、AI训练，以及通过高精度可视化实现与自然的深度交互。",
        "jp" => "BoquilaVerseは、フォトグラメトリーとAIによって作成された3Dモデルの成長するオープンコレクションを提供します。教育、AIトレーニング、自然とのつながりに最適です。",
        "de" => "BoquilaVerse bietet eine wachsende offene Sammlung von 3D-Modellen, die mit Photogrammetrie und KI erstellt wurden. Ideal für Bildung, KI-Training und die Verbindung zur Natur durch detaillierte Visualisierungen.",
        "it" => "BoquilaVerse offre una raccolta aperta e crescente di modelli 3D creati con fotogrammetria e intelligenza artificiale. Ideale per l'educazione, la formazione AI e per connettersi con la natura attraverso visualizzazioni dettagliate.",
        "dk" => "BoquilaVerso tilbyder en voksende åben samling af 3D-modeller lavet med fotogrammetri og kunstig intelligens. Ideelt til uddannelse, AI-træning og forbindelse med naturen gennem detaljerede visualiseringer."
    ),
    links=Dict(
        "en" => "https://boquila.org/verse",
        "es" => "https://boquila.org/verso",
        :default => lang -> "https://boquila.org/$(lang)/verse"
    ),
    img=Dict(
        :default => lang -> "https://boquila.org/assets/blog/pudu-museum.jpg"
    ),
)

hub = Page(
    title=Dict(:default => lang -> "BoquilaHUB"),
    desc=Dict(
        "es" => "BoquilaHUB empodera a los conservacionistas con IA desplegada localmente, ¡sin necesidad de nube! Disfruta de un rendimiento eficiente, una interfaz sencilla y análisis en tiempo real de imágenes y videos, incluso en dispositivos embebidos.",
        "en" => "BoquilaHUB empowers conservationists with locally deployed AI—no cloud needed. Enjoy efficient performance, simple UI, and real-time analysis of images and video, even on embedded devices.",
        "fr" => "BoquilaHUB autonomise les conservationnistes avec une IA déployée localement, sans besoin de cloud ! Profitez de performances efficaces, d'une interface simple et d'une analyse en temps réel des images et vidéos, même sur des appareils embarqués.",
        "zh" => "BoquilaHUB为环保工作者提供本地化AI解决方案，无需依赖云端。即使在嵌入式设备上，也能实现高效的图像与视频实时分析，操作界面简洁，性能卓越。",
        "jp" => "BoquilaHUBは、クラウドを必要とせずにローカルで展開されたAIで自然保護活動を支援します。シンプルなUI、効率的なパフォーマンス、リアルタイムの画像・動画解析が可能です。",
        "de" => "BoquilaHUB unterstützt Naturschützer mit lokal eingesetzter KI – ganz ohne Cloud. Genieße effiziente Leistung, einfache Benutzeroberfläche und Echtzeitanalyse von Bildern und Videos, auch auf eingebetteten Geräten.",
        "it" => "BoquilaHUB potenzia i conservazionisti con l'IA implementata localmente, senza bisogno di cloud! Goditi prestazioni efficienti, un'interfaccia semplice e analisi in tempo reale di immagini e video, anche su dispositivi embedded.",
        "dk" => "BoquilaHUB styrker naturværnere med lokalt udrullet KI – ingen sky krævet. Nyde effektiv ydeevne, enkel brugergrænseflade og realtidanalyse af billeder og video, selv på indlejrede enheder."
    ),
    links=Dict(
        "en" => "https://boquila.org/hub",
        :default => lang -> "https://boquila.org/$(lang)/hub"
    ),
    img=Dict(
        :default => lang -> "https://raw.githubusercontent.com/boquila/boquilahub/main/readme.jpg"
    ),
)

donate = Page(
    title=Dict(
        "en" => "Support the Boquila Foundation",
        "es" => "Apoya a Fundación Boquila",
        "fr" => "Soutenez la Fondation Boquila",
        "zh" => "支持波奇拉基金会",
        "jp" => "Boquila財団を支援する",
        "de" => "Unterstütze die Boquila-Stiftung",
        "it" => "Supporta la Fondazione Boquila",
        "dk" => "Støt Boquila Fonden",
        :default => lang -> "Support Boquila"
    ),
    desc=Dict(
        "es" => "Apoya a Boquila y sé parte de un movimiento global para proteger el planeta. Tu compromiso puede marcar la diferencia en la conservación de la biodiversidad y el desarrollo sustentable. ¡Dona ahora y únete al cambio!",
        "en" => "Support Boquila and become part of a global movement to protect the planet. Your commitment can make a difference in biodiversity conservation and sustainable development. Donate now and join the change!",
        "fr" => "Soutenez Boquila et rejoignez un mouvement mondial pour protéger la planète. Votre engagement peut faire la différence dans la conservation de la biodiversité et le développement durable. Faites un don maintenant et participez au changement !",
        "zh" => "支持Boquila，加入全球守护地球的行动。您的每一份投入都将推动生物多样性保护与可持续发展。立即捐赠，成为变革的力量！",
        "jp" => "Boquilaを支援し、地球を守るためのグローバルな取り組みに参加しましょう。あなたの支援が生物多様性の保全と持続可能な発展に大きな影響を与えます。今すぐ寄付して変化を起こそう！",
        "de" => "Unterstütze Boquila und werde Teil einer globalen Bewegung zum Schutz unseres Planeten. Dein Engagement kann einen Unterschied in der Erhaltung der Biodiversität und nachhaltigen Entwicklung machen. Spende jetzt und sei Teil des Wandels!",
        "it" => "Supporta Boquila e diventa parte di un movimento globale per proteggere il pianeta. Il tuo impegno può fare la differenza nella conservazione della biodiversità e nello sviluppo sostenibile. Dona ora e unisciti al cambiamento!",
        "dk" => "Støt Boquila og bliv en del af en global bevægelse for at beskytte planeten. Dit engagement kan gøre en forskel i biodiversitetens bevarelse og bæredygtig udvikling. Donér nu og bliv en del af forandringen!"
    ),
    links=Dict(
        "en" => "https://boquila.org/donate",
        "es" => "https://boquila.org/donar",
        :default => lang -> "https://boquila.org/$(lang)/donate"
    ),
    img=Dict(
        :default => lang -> "https://boquila.org/assets/img/logo.png"
    ),
)

default = Page(
    title=Dict(
        "es" => "Fundación Boquila",
        "en" => "Boquila Foundation",
        "fr" => "Fondation Boquila",
        "zh" => "Boquila基金会",
        "jp" => "Boquila財団",
        "de" => "Boquila-Stiftung",
        "it" => "Fondazione Boquila",
        "dk" => "Boquila Fonden",
        :default => lang -> "Boquila"
    ),
    desc=Dict(
        "es" => "Fundación boquila es una organización dedicada a la investigación aplicada, la conservación de la biodiversidad y el desarrollo sustentable. Utilizamos herramientas basadas en inteligencia artificial como nuestra base. Trabajamos para encontrar soluciones innovadoras que aborden los desafíos ambientales y sociales de nuestra época.",
        "en" => "Boquila Foundation is a non profit dedicated to applied research, the conservation of biodiversity and sustainable development. We use artificial intelligence-based tools as our basis. We work to find innovative solutions that address the environmental and social challenges of our time.",
        "zh" => "Boquila基金会是一家致力于应用研究、生物多样性保护和可持续发展的非营利组织。我们以人工智能技术为基础，寻找创新解决方案，以应对当今的环境和社会挑战。",
        "fr" => "La Fondation Boquila est une organisation à but non lucratif dédiée à la recherche appliquée, à la conservation de la biodiversité et au développement durable. Nous utilisons des outils basés sur l'intelligence artificielle. Nous travaillons à trouver des solutions innovantes pour relever les défis environnementaux et sociaux de notre époque.",
        "jp" => "Boquila財団は、応用研究、生物多様性の保全、持続可能な開発に取り組む非営利団体です。AIベースのツールを活用して、現代の環境的・社会的課題に対応する革新的な解決策を追求しています。",
        "de" => "Die Boquila-Stiftung ist eine gemeinnützige Organisation, die sich der angewandten Forschung, dem Erhalt der Biodiversität und der nachhaltigen Entwicklung widmet. Wir nutzen KI-basierte Werkzeuge, um innovative Lösungen für die ökologischen und sozialen Herausforderungen unserer Zeit zu finden.",
        "it" => "La Fondazione Boquila è un'organizzazione no-profit dedicata alla ricerca applicata, alla conservazione della biodiversità e allo sviluppo sostenibile. Utilizziamo strumenti basati sull'intelligenza artificiale. Lavoriamo per trovare soluzioni innovative che affrontino le sfide ambientali e sociali della nostra epoca.",
        "dk" => "Boquila Fonden er en non-profit organisation dedikeret til anvendt forskning, bevarelse af biodiversitet og bæredygtig udvikling. Vi bruger KI-baserede værktøjer som vores grundlag. Vi arbejder for at finde innovative løsninger, der adresserer vores tids miljømæssige og sociale udfordringer."
    ),
    links=Dict(
        "es" => "https://boquila.org/",
        :default => lang -> "https://boquila.org/$(lang)"
    ),
    img=Dict(
        :default => lang -> "https://boquila.org/assets/img/logo.png"
    ),
)

const keywords::DictDef = Dict(
    "es" => "Inteligencia artificial, IA, biodiversidad, conservación, proyectos, Chile, innovación, tecnología, medio ambiente, sostenibilidad, cambio climático, ecología, protección de la naturaleza.",
    "en" => "Artificial intelligence, AI, biodiversity, conservation, projects, Chile, innovation, technology, environment, sustainability, climate change, ecology, nature protection.",
    "zh" => "人工智能, AI, 生物多样性, 保护, 项目, 智利, 创新, 技术, 环境, 可持续性, 气候变化, 生态学, 自然保护",
    "fr" => "Intelligence artificielle, IA, biodiversité, conservation, projets, Chili, innovation, technologie, environnement, durabilité, changement climatique, écologie, protection de la nature.",
    "jp" => "人工知能, AI, 生物多様性, 保全, プロジェクト, チリ, イノベーション, 技術, 環境, 持続可能性, 気候変動, 生態学, 自然保護",
    "de" => "Künstliche Intelligenz, KI, Biodiversität, Naturschutz, Projekte, Chile, Innovation, Technologie, Umwelt, Nachhaltigkeit, Klimawandel, Ökologie, Naturschutz",
    "it" => "Intelligenza artificiale, IA, biodiversità, conservazione, progetti, Cile, innovazione, tecnologia, ambiente, sostenibilità, cambiamento climatico, ecologia, protezione della natura.",
    "dk" => "Kunstig intelligens, AI, biodiversitet, bevarelse, projekter, Chile, innovation, teknologi, miljø, bæredygtighed, klimaforandringer, økologi, naturbeskyttelse."
)

const donate_button_text::DictDef = Dict(
    "es" => "Donar",
    "en" => "Donate",
    "fr" => "Faire un don",
    "zh" => "捐赠",
    "jp" => "寄付する",
    "de" => "Spenden",
    "it" => "Dona",
    "dk" => "Donér"
)

const footer_text::DictDef = Dict(
    "es" => "Uniendo tecnología y naturaleza",
    "en" => "Connecting technology and nature.",
    "fr" => "Connecter la technologie et la nature.",
    "zh" => "科技与自然的联结",
    "jp" => "テクノロジーと自然をつなぐ",
    "de" => "Technologie und Natur verbinden",
    "it" => "Collegare tecnologia e natura",
    "dk" => "Forener teknologi og natur."
)



lang = langs[1]
es = [
    HTML("index.html", lang, default)
    HTML("verso.html", lang, verse)
    HTML("donar.html", lang, donate)
    HTML("es/hub.html", lang, hub)
]

lang = langs[2]
en = [HTML("en/index.html", lang, default)
    HTML("verse.html", lang, verse)
    HTML("donate.html", lang, donate)
    HTML("hub.html", lang, hub)
]

save.(en)
save.(es)

process.(langs[3:end])

# write a for loop that prints a bunch of stuff

