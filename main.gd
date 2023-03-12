extends Node

var helloExecutor: GQLQueryExecuter

func _ready():
	helloExecutor = get_node('/root/GqlClient').query('hello', {"name": "String"}, GQLQuery.new("hello").set_args({"name":"name"}))
	helloExecutor.graphql_response.connect(self.graphql_response)
	add_child(helloExecutor)

func _on_hello_pressed():
	helloExecutor.run({"name": $Name.text})

func graphql_response(data: Dictionary):
	print(data)
	var gql_data = data.get('data', {})
	var hello = gql_data.get('hello', null)
	if hello:
		$Response.text = hello
