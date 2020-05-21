require 'test_helper'

class SquadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @squad = squads(:one)
  end

  test "should get index" do
    get squads_url, as: :json
    assert_response :success
  end

  test "should create squad" do
    assert_difference('Squad.count') do
      post squads_url, params: { squad: { name: @squad.name } }, as: :json
    end

    assert_response 201
  end

  test "should show squad" do
    get squad_url(@squad), as: :json
    assert_response :success
  end

  test "should update squad" do
    patch squad_url(@squad), params: { squad: { name: @squad.name } }, as: :json
    assert_response 200
  end

  test "should destroy squad" do
    assert_difference('Squad.count', -1) do
      delete squad_url(@squad), as: :json
    end

    assert_response 204
  end
end
