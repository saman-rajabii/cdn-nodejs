local required_string = "pong"

local resp = ngx.location.capture("/ping", {

  method = ngx.HTTP_GET

})

if not resp then

  ngx.say("request error :", err)

  return

end

ngx.log(ngx.ERR, tostring(resp.status))

--Get the status code

ngx.status = resp.status

--Response volume

if resp.body and string.find(resp.body, required_string) then

  ngx.header\["Content-type"\] = "application/json" 

  ngx.say("{ status: true }")

end