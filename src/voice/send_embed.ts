export const send_embed = async (
  channel_id: string,
  title: string,
  avatar_url: string,
  bot_token: string
) => {
  const url = `https://discord.com/api/v9/channels/${channel_id}/messages`

  const embed = {
    title,
    color: 0xffd3fb,
    thumbnail: {
      url: avatar_url
    }
  }

  const payload = {
    embeds: [embed]
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${bot_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return res
}
