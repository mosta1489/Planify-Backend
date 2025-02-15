# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import generated.ai_service_pb2 as ai__service__pb2


class AIStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.create_project = channel.unary_unary(
                '/ai_service.AI/create_project',
                request_serializer=ai__service__pb2.project_request.SerializeToString,
                response_deserializer=ai__service__pb2.project_response.FromString,
                )
        self.create_version = channel.unary_unary(
                '/ai_service.AI/create_version',
                request_serializer=ai__service__pb2.version_request.SerializeToString,
                response_deserializer=ai__service__pb2.version_response.FromString,
                )


class AIServicer(object):
    """Missing associated documentation comment in .proto file."""

    def create_project(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def create_version(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AIServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'create_project': grpc.unary_unary_rpc_method_handler(
                    servicer.create_project,
                    request_deserializer=ai__service__pb2.project_request.FromString,
                    response_serializer=ai__service__pb2.project_response.SerializeToString,
            ),
            'create_version': grpc.unary_unary_rpc_method_handler(
                    servicer.create_version,
                    request_deserializer=ai__service__pb2.version_request.FromString,
                    response_serializer=ai__service__pb2.version_response.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'ai_service.AI', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class AI(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def create_project(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ai_service.AI/create_project',
            ai__service__pb2.project_request.SerializeToString,
            ai__service__pb2.project_response.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def create_version(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ai_service.AI/create_version',
            ai__service__pb2.version_request.SerializeToString,
            ai__service__pb2.version_response.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
