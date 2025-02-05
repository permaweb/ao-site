local json = require('json')

Preferences = Preferences or {}

Handlers.add('Get-Preferences', { Action = 'Get-Preferences' }, function(msg)
	if not msg.Address or not Preferences[msg.Address] then
		msg.reply({ Status = 'Warning', Response = 'No preferences found' })
		return
	end
	msg.reply({ Status = 'Success', Data = json.encode(Preferences[msg.Address]) })
end)

Handlers.add('Update-Preferences', { Action = 'Update-Preferences' }, function(msg)
	local data = json.decode(msg.Data)
	if not data then
		msg.reply({ Status = 'Error', Response = 'Invalid data' })
		return
	end

	local total = 0
	for _, token in ipairs(data) do
		total = total + (token.value or 0)
	end

	if total > 1 then
		msg.reply({ Status = 'Error', Response = 'Total allocation exceeds 1' })
		return
	end

	Preferences[msg.From] = data
	msg.reply({ Status = 'Success', Response = 'Preferences saved!' })
end)
