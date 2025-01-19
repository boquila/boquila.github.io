using CSV,DataFrames,Unicode
minify_html(html::String)::String = replace(replace(html, r"\s+" => " "), r">\s+<" => "><") # not the best option
addion(str::String)::String = replace(str, " " => "-")
remove_dots(str::String)::String = replace(str, r"[.,;!?\s]" => "")
name_html(str::String)::String = Unicode.normalize(str |> addion |> remove_dots |> lowercase |> Unicode.normalize,stripmark=true)*".html"
